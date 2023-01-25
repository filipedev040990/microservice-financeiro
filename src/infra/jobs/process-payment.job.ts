import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { UpdatePaymentStatusUseCaseInterface } from '@/domain/usecases/update-payment-status.interface'
import constants from '@/shared/constants'

export class ProcessPaymentJob implements ProcessPaymentJobInterface {
  constructor (
    private readonly getPaymentByStatus: GetPaymentByStatusUseCaseInterface,
    private readonly updatePaymentStatus: UpdatePaymentStatusUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    const payments = await this.getPaymentByStatus.execute(constants.PAYMENT_STATUS_WAITING)

    if (payments) {
      payments.map(async (payment) => {
        await this.updatePaymentStatus.execute(payment.id, constants.PAYMENT_STATUS_PROCESSING)
      })
    }
  }
}
