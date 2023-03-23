import { Client } from '../entities/client.entity'

export interface ClientInput {
  name: string
  person_type: string
  email: string
  document: string
  phone: string
  external_code: string
  created_at?: Date
}

export interface SaveClientUseCaseInterface {
  execute(input: ClientInput): Promise<Client>
}
