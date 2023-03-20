import { SaveLogUseCaseInterface } from '@/domain'
import { LogInput, SaveLogRepositoryInterface } from '@/domain/repositories/save-log-repository.interface'

export class SaveLogUseCase implements SaveLogUseCaseInterface {
  constructor (private readonly logRepository: SaveLogRepositoryInterface) {}
  async execute (log: LogInput): Promise<void> {
    await this.logRepository.save(log)
  }
}
