import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { QueueInterface } from '@/domain/queue/queue.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { SaveLogUseCaseInterface } from '@/domain/usecases/save-log-usecase.interface'
import { UpdatePaymentAttemptsUseCaseInterface } from '@/domain/usecases/update-payment-attempts.interface'
import { UpdatePaymentStatusUseCaseInterface } from '@/domain/usecases/update-payment-status.interface'
import constants from '@/shared/constants'

export class ProcessPaymentJob implements ProcessPaymentJobInterface {
  constructor (
    private readonly getPaymentByStatus: GetPaymentByStatusUseCaseInterface,
    private readonly updatePaymentStatus: UpdatePaymentStatusUseCaseInterface,
    private readonly queue: QueueInterface,
    private readonly updatePaymentAttempts: UpdatePaymentAttemptsUseCaseInterface,
    private readonly saveLog: SaveLogUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    try {
      const payments = await this.getPaymentByStatus.execute(constants.PAYMENT_STATUS_WAITING)

      if (payments) {
        payments.map(async (payment) => {
          const attempts = payment.attempts_processing
          const maxAttempts = constants.MAX_ATTEMPTS_TO_PROCESS
          const canEnqueue = attempts <= maxAttempts

          const payload = JSON.stringify({
            id: payment.id,
            client_id: payment.client_id,
            description: payment.description,
            installments: payment.installments,
            value: payment.value
          })

          if (canEnqueue) {
            await this.queue.publish('payments_processing', 'payments_processing', payload)
            await this.updatePaymentAttempts.execute(payment.client_id, attempts + 1)
          }

          const newStatus = canEnqueue ? constants.PAYMENT_STATUS_PROCESSING : constants.PAYMENT_STATUS_CANCELED
          await this.updatePaymentStatus.execute(payment.id, newStatus)
        })
      }
    } catch (error) {
      await this.saveLog.execute(JSON.stringify(error))
    }
  }
}
