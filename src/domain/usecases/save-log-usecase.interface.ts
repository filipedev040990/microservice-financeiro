import { LogInput } from '../repositories/save-log-repository.interface'

export interface SaveLogUseCaseInterface {
  execute(log: LogInput): Promise<void>
}
