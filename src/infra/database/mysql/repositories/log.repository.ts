import { LogInput, SaveLogRepositoryInterface } from '@/domain/repositories/save-log-repository.interface'
import { prismaClient } from './prisma-client'

export class LogRepository implements SaveLogRepositoryInterface {
  async save (log: LogInput): Promise<void> {
    await prismaClient.log.create({
      data: {
        log: log.log,
        created_at: log.created_at
      }
    })
  }
}
