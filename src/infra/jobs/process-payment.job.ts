import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { QueueInterface } from '@/domain/queue/queue.interface'
import { GetPaymentByStatusUseCaseInterface, PaymentOut, SaveLogUseCaseInterface, UpdatePaymentAttemptsUseCaseInterface, UpdatePaymentStatusUseCaseInterface } from '@/domain'
import constants from '@/shared/constants'
import { SavePaymentTraceInterface } from '@/domain/usecases/save-payment-trace.interface'

export class ProcessPaymentJob implements ProcessPaymentJobInterface {
  constructor (
    private readonly getPaymentByStatus: GetPaymentByStatusUseCaseInterface,
    private readonly updatePaymentStatus: UpdatePaymentStatusUseCaseInterface,
    private readonly queue: QueueInterface,
    private readonly updatePaymentAttempts: UpdatePaymentAttemptsUseCaseInterface,
    private readonly saveLog: SaveLogUseCaseInterface,
    private readonly savePaymentTrace: SavePaymentTraceInterface
  ) {}

  async execute (): Promise<void> {
    try {
      const payments = await this.getPaymentByStatus.execute(constants.PAYMENT_STATUS_WAITING)
      if (payments.length) {
        payments.map(async (payment) => {
          const attempts = +payment.attempts_processing
          const maxAttempts = constants.MAX_ATTEMPTS_TO_PROCESS
          const canEnqueue = attempts <= maxAttempts
          const paymentId = payment.id

          const newStatus = canEnqueue ? constants.PAYMENT_STATUS_PROCESSING : constants.PAYMENT_STATUS_REFUSED
          await this.savePaymentTrace.execute({ paymentId, status: newStatus })
          await this.updatePaymentStatus.execute(paymentId, newStatus)

          if (canEnqueue) {
            const payload = JSON.stringify(this.makePayload(payment))
            await this.queue.start()
            await this.queue.publish('payments_processing', 'payments_processing', payload)
            await this.updatePaymentAttempts.execute(paymentId, attempts + 1)
          }
        })
      }
    } catch (error) {
      const logInput = {
        log: JSON.stringify(error),
        created_at: new Date()
      }
      await this.saveLog.execute(logInput)
    }
  }

  makePayload (payment): PaymentOut {
    return {
      client: {
        id: payment.client.id,
        email: payment.client.email,
        person_type: payment.client.person_type,
        document: payment.client.document,
        external_code: payment.external_code
      },
      card: {
        holder_name: payment.client.holder_name,
        number: payment.client.Card.card_number,
        brand: payment.client.Card.brand,
        cvv: payment.client.Card.cvv,
        month: payment.client.Card.month,
        year: payment.client.Card.year
      },
      payment: {
        id: payment.id,
        installments: payment.installments,
        attempts_processing: payment.attempts_processing,
        description: payment.description,
        value: payment.value
      }
    }
  }
}
