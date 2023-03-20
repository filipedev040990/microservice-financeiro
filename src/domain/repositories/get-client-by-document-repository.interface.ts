import { Client } from '../entities/client.entity'

export interface GetClientByDocumentRepositoryInterface {
  getByDocument (document: string): Promise<Client>
}
