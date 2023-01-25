import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import constants from '@/shared/constants'

export class ProcessPaymentJob implements ProcessPaymentJobInterface {
  constructor (
    private readonly getPaymentByStatus: GetPaymentByStatusUseCaseInterface
  ) {}

  async execute (): Promise<void> {
    const status = constants.PAYMENT_STATUS_WAITING
    await this.getPaymentByStatus.execute(status)
  }
}
