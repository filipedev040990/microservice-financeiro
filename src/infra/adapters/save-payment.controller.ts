import { ControllerInterface, SaveAddressUseCaseInterface, SaveCardUseCaseInterface, SaveClientUseCaseInterface, SavePaymentUseCaseInterface, GetClientByDocumentUseCaseInterface } from '@/domain'
import { SavePaymentTraceInterface } from '@/domain/usecases/save-payment-trace.interface'
import { ValidationInterface } from '@/domain/validation/validation.interface'
import constants from '@/shared/constants'
import { InvalidParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helpers'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class SavePaymentController implements ControllerInterface {
  constructor (
    private readonly getClientByDocumentUsecase: GetClientByDocumentUseCaseInterface,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly saveAddressUseCase: SaveAddressUseCaseInterface,
    private readonly saveCardUseCase: SaveCardUseCaseInterface,
    private readonly savePaymentUseCase: SavePaymentUseCaseInterface,
    private readonly validation: ValidationInterface,
    private readonly savePaymentTraceUseCase: SavePaymentTraceInterface

  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(input.body)
      if (error) {
        return badRequest(error)
      }

      const clientExists = await this.getClientByDocumentUsecase.execute(input.body.document)
      if (clientExists) {
        return badRequest(new InvalidParamError('This document already in use'))
      }

      const client = await this.saveClientUseCase.execute({
        name: input.body.name,
        email: input.body.email,
        person_type: input.body.person_type,
        document: input.body.document,
        phone: input.body.phone,
        external_code: input.body.lead_external_code
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

      const { id } = await this.savePaymentUseCase.execute({
        client_id: client.id,
        status: constants.PAYMENT_STATUS_WAITING,
        attempts_processing: 0,
        installments: input.body.installments,
        description: constants.DESCRIPTION_DEFAULT,
        value: 1200,
        created_at: new Date()
      })

      await this.savePaymentTraceUseCase.execute({
        paymentId: id,
        status: constants.PAYMENT_STATUS_TRACE_INITIAL
      })

      return noContent()
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
