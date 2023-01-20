import { ClientInput } from '../entities/client.entity'

export interface SaveClientRepositoryInterface {
  save(input: ClientInput): Promise<void>
}
