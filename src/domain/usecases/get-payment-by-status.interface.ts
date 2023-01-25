import { Payment } from '../entities/payment'

export interface GetPaymentByStatusUseCaseInterface {
  execute(status: string): Promise<Payment[]>
}
