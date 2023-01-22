import { SaveClientUseCase } from '@/application/usecases/save-client/save-client.usecase'
import { ClientRepository } from '@/infra/database/mysql/repositories/client.repository'

export const makeSaveClientUseCaseFactory = (): SaveClientUseCase => {
  const clientRepository = new ClientRepository()
  return new SaveClientUseCase(clientRepository)
}
