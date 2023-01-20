import { Client } from '../entities/client.entity'

export interface ClientInput {
  name: string
  person_type: 'pf' | 'pj'
  email: string
  document: string
  phone: string
  created_at?: Date
}

export interface SaveClientUseCaseInterface {
  execute(input: ClientInput): Promise<Client>
}
