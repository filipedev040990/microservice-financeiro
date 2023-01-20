import { Client, ClientInput } from '@/domain/entities/client.entity'
import { SaveClientRepositoryInterface } from '@/domain/repositories/save-client-repository.interface'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'

export class SaveClientUseCase implements SaveClientUseCaseInterface {
  constructor (private readonly clientRepository: SaveClientRepositoryInterface) {}
  async execute (input: ClientInput): Promise<void> {
    const client = new Client(input)
    await this.clientRepository.save({
      name: client.name,
      email: client.email,
      person_type: client.person_type,
      document: client.document,
      phone: client.phone,
      cep: client.cep,
      street: client.street,
      district: client.district,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      created_at: client.created_at
    })
  }
}
