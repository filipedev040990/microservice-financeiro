import { GetClientByDocumentUseCase } from '@/application/usecases/get-client-by-document/get-client-by-document.usecase'
import { GetClientByDocumentUseCaseInterface } from '@/domain/interfaces'
import { ClientRepository } from '@/infra/database/mysql/repositories/client.repository'

export const makeGetClientByDocumentUsecaseFactory = (): GetClientByDocumentUseCaseInterface => {
  const clientRepository = new ClientRepository()
  return new GetClientByDocumentUseCase(clientRepository)
}
