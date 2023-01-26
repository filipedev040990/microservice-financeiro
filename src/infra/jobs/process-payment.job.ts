import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { QueueInterface } from '@/domain/queue/queue.interface'
import { GetPaymentByStatusUseCaseInterface, PaymentOut, SaveLogUseCaseInterface, UpdatePaymentAttemptsUseCaseInterface, UpdatePaymentStatusUseCaseInterface } from '@/domain'
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
          const attempts = payment.payment.attempts_processing
          const maxAttempts = constants.MAX_ATTEMPTS_TO_PROCESS
          const canEnqueue = attempts <= maxAttempts
          const clientId = payment.client.id

          const payload = JSON.stringify(this.makePayload(payment))

          if (canEnqueue) {
            await this.queue.publish('payments_processing', 'payments_processing', payload)
            await this.updatePaymentAttempts.execute(clientId, attempts + 1)
          }

          const newStatus = canEnqueue ? constants.PAYMENT_STATUS_PROCESSING : constants.PAYMENT_STATUS_CANCELED
          await this.updatePaymentStatus.execute(clientId, newStatus)
        })
      }
    } catch (error) {
      await this.saveLog.execute(JSON.stringify(error))
    }
  }

  makePayload (payment): PaymentOut {
    return {
      client: {
        id: payment.client.id,
        holder_name: payment.client.holder_name,
        email: payment.client.email,
        person_type: payment.client.person_type,
        document: payment.client.document
      },
      card: {
        number: payment.card.number,
        brand: payment.card.brand,
        cvv: payment.card.cvv,
        month: payment.card.month,
        year: payment.card.year
      },
      payment: {
        id: payment.payment.id,
        installments: payment.payment.installments,
        attempts_processing: payment.payment.attempts_processing,
        description: payment.payment.description
      }
    }
  }
}
