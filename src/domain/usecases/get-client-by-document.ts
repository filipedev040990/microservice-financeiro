import { Client } from '../entities/client.entity'

export interface GetClientByDocumentUseCaseInterface {
  execute(document: string): Promise<Client>
}
