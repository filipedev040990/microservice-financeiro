import { Client } from '../entities/client.entity'
import { ClientInput } from '../usecases/save-client-usecase.interface'

export interface SaveClientRepositoryInterface {
  save(input: ClientInput): Promise<Client>
}
