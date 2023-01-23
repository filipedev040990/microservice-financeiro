import { ControllerInterface, SaveAddressUseCaseInterface, SaveCardUseCaseInterface, SaveClientUseCaseInterface, SavePaymentUseCaseInterface, GetClientByDocumentUseCaseInterface } from '@/domain/interfaces'
import { EmailValidatorInterface } from '@/domain/validation/email-validator.interface'
import constants from '@/shared/constants'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helpers'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class SavePaymentController implements ControllerInterface {
  constructor (
    private readonly getClientByDocumentUsecase: GetClientByDocumentUseCaseInterface,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly saveAddressUseCase: SaveAddressUseCaseInterface,
    private readonly saveCardUseCase: SaveCardUseCaseInterface,
    private readonly savePaymentUseCase: SavePaymentUseCaseInterface,
    private readonly emailValidator: EmailValidatorInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const missingParam = this.validateRequiredFields(input)
      if (missingParam) {
        return badRequest(new MissingParamError(missingParam))
      }

      const clientExists = await this.getClientByDocumentUsecase.execute(input.body.document)
      if (clientExists) {
        return badRequest(new InvalidParamError('This document already in use'))
      }

      const emailIsValid = await this.emailValidator.execute(input.body.email)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const client = await this.saveClientUseCase.execute({
        name: input.body.name,
        email: input.body.email,
        person_type: input.body.person_type,
        document: input.body.document,
        phone: input.body.phone
      })

      await this.saveAddressUseCase.execute({
        client_id: client.id,
        cep: input.body.cep,
        street: input.body.street,
        number: input.body.number,
        complement: input.body.complement,
        district: input.body.district,
        city: input.body.city,
        state: input.body.state
      })

      await this.saveCardUseCase.execute({
        client_id: client.id,
        holder_name: input.body.holder_name,
        card_number: input.body.card_number,
        cvv: input.body.cvv,
        month: input.body.month,
        year: input.body.year,
        brand: input.body.brand
      })

      await this.savePaymentUseCase.execute({
        client_id: client.id,
        status: constants.PAYMENT_STATUS_WAITING,
        attempts_processing: 0,
        installments: input.body.installments,
        description: constants.DESCRIPTION_DEFAULT,
        value: 1200
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  validateRequiredFields = (input: HttpRequest): string => {
    const requiredFields = [
      'person_type', 'email', 'document', 'phone',
      'cep', 'street', 'number', 'district', 'city', 'state', 'brand',
      'holder_name', 'card_number', 'month', 'year', 'cvv', 'installments'
    ]
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}
