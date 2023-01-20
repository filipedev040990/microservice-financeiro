import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest, serverError } from '@/shared/helpers/http.helpers'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class SaveClientController implements ControllerInterface {
  constructor (
    private readonly getClientByDocumentUsecase: GetClientByDocumentUseCaseInterface,
    private readonly saveClientUseCase: SaveClientUseCaseInterface
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

      await this.saveClientUseCase.execute(input.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }

  validateRequiredFields = (input: HttpRequest): string => {
    const requiredFields = ['person_type', 'email', 'document', 'phone', 'cep', 'street', 'number', 'district', 'city', 'state']
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return field
      }
    }
  }
}
