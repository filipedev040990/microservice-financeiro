import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveAddressUseCaseInterface } from '@/domain/usecases/save-address-usecase.interface'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helpers'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class SavePaymentController implements ControllerInterface {
  constructor (
    private readonly getClientByDocumentUsecase: GetClientByDocumentUseCaseInterface,
    private readonly saveClientUseCase: SaveClientUseCaseInterface,
    private readonly saveAddressUseCase: SaveAddressUseCaseInterface
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

      await this.saveClientUseCase.execute({
        name: input.body.name,
        email: input.body.email,
        person_type: input.body.person_type,
        document: input.body.document,
        phone: input.body.phone
      })

      await this.saveAddressUseCase.execute({
        client_id: input.body.client_id,
        cep: input.body.cep,
        street: input.body.street,
        number: input.body.number,
        complement: input.body.complement,
        district: input.body.district,
        city: input.body.city,
        state: input.body.state
      })

      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }

  validateRequiredFields = (input: HttpRequest): string => {
    const requiredFields = [
      'person_type', 'email', 'document', 'phone',
      'cep', 'street', 'number', 'district', 'city', 'state',
      'holder_name', 'card_number', 'month', 'year', 'cvv', 'installments'
    ]
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}
