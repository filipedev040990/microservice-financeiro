import { ControllerInterface } from '@/domain/controllers/controller.interface'
import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { HttpRequest, HttpResponse } from '@/shared/types/http.types'

export class SaveClientController implements ControllerInterface {
  constructor (
    private readonly getClientByDocumentUsecase: GetClientByDocumentUseCaseInterface,
    private readonly saveClientUseCase: SaveClientUseCaseInterface
  ) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    await this.getClientByDocumentUsecase.execute(input.body.document)
    return null
  }
}
