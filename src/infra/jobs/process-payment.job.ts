import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { QueueInterface } from '@/domain/queue/queue.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { UpdatePaymentStatusUseCaseInterface } from '@/domain/usecases/update-payment-status.interface'
import constants from '@/shared/constants'

export class ProcessPaymentJob implements ProcessPaymentJobInterface {
  constructor (
    private readonly getPaymentByStatus: GetPaymentByStatusUseCaseInterface,
    private readonly updatePaymentStatus: UpdatePaymentStatusUseCaseInterface,
    private readonly queue: QueueInterface
  ) {}

  async execute (): Promise<void> {
    const payments = await this.getPaymentByStatus.execute(constants.PAYMENT_STATUS_WAITING)

    if (payments) {
      console.log(payments)
      payments.map(async (payment) => {
        if (payment.attempts_processing <= constants.MAX_ATTEMPTS_TO_PROCESS) {
          const payload = {
            id: payment.id,
            client_id: payment.client_id,
            description: payment.description,
            installments: payment.installments,
            value: payment.value
          }
          await this.queue.publish('payments_processing', 'payments_processing', JSON.stringify(payload))
          await this.updatePaymentStatus.execute(payment.id, constants.PAYMENT_STATUS_PROCESSING)
        }
      })
    }
  }
}
