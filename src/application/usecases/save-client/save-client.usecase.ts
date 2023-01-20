import { ClientInput } from '@/domain/entities/client.entity'
import { SaveClientRepositoryInterface } from '@/domain/repositories/save-client-repository.interface'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'

export class SaveClientUseCase implements SaveClientUseCaseInterface {
  constructor (private readonly clientRepository: SaveClientRepositoryInterface) {}
  async execute (input: ClientInput): Promise<void> {
    await this.clientRepository.save(input)
  }
}
