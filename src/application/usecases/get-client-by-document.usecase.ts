import { Client } from '@/domain/entities/client.entity'
import { GetClientByDocumentRepositoryInterface } from '@/domain/repositories/get-client-by-document-repository.interface'
import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'

export class GetClientByDocumentUseCase implements GetClientByDocumentUseCaseInterface {
  constructor (private readonly clientRepository: GetClientByDocumentRepositoryInterface) {}
  async execute (document: string): Promise<Client> {
    return await this.clientRepository.getByDocument(document)
  }
}
