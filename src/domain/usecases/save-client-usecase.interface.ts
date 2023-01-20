import { Client, ClientInput } from '../entities/client.entity'

export interface SaveClientUseCaseInterface {
  execute(input: ClientInput): Promise<Client>
}
