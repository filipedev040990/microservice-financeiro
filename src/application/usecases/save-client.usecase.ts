import { Client } from '@/domain/entities/client.entity'
import { SaveClientRepositoryInterface } from '@/domain/repositories/save-client-repository.interface'
import { ClientInput, SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'

export class SaveClientUseCase implements SaveClientUseCaseInterface {
  constructor (private readonly clientRepository: SaveClientRepositoryInterface) {}
  async execute (input: ClientInput): Promise<Client> {
    const client = new Client(input)

    return await this.clientRepository.save({
      name: client.name,
      email: client.email,
      person_type: client.person_type,
      document: client.document,
      phone: client.phone,
      external_code: client.external_code,
      created_at: client.created_at
    })
  }
}
