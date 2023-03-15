import { UpdatePaymentUseCase } from '@/application/usecases'
import { SaveLogUseCase } from '@/application/usecases/save-log.usecase'
import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import config from '@/infra/config'
import constants from '@/shared/constants'
import { LogRepository } from '../database/mysql/repositories/log.repository'
import { PaymentRepository } from '../database/mysql/repositories/payment.repository'

export const ConsumeQueueProcessedPayments = async (): Promise<void> => {
  try {
    const queue = new RabbitmqAdapter(config.rabbitmq.uri)
    await queue.start()
    await queue.consume('financeiro_payments_processed', async (message: any) => {
      const response = JSON.parse(message.content.toString())
      const status = response.status === 'confirmed' ? constants.PAYMENT_STATUS_PAID : constants.PAYMENT_STATUS_WAITING

      const paymentRepository = new PaymentRepository()
      const updatePaymentStatus = new UpdatePaymentUseCase(paymentRepository)
      await updatePaymentStatus.execute(response.payment_id, status)
    })
  } catch (error) {
    const logRepository = new LogRepository()
    const logUseCase = new SaveLogUseCase(logRepository)

    const logInput = {
      log: JSON.stringify(error),
      created_at: new Date()
    }

    await logUseCase.execute(logInput)
  }
}
