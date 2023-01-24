import { Payment } from '../entities/payment'

export interface GetPaymentByStatusInterface {
  execute(status: string): Promise<Payment>
}
