import { SaveLogUseCaseInterface } from '@/domain'
import { SaveLogRepositoryInterface } from '@/domain/repositories/save-log-repository.interface'

export class SaveLogUseCase implements SaveLogUseCaseInterface {
  constructor (private readonly paymentRepository: SaveLogRepositoryInterface) {}
  async execute (input: string): Promise<void> {
    await this.paymentRepository.save(input)
  }
}
