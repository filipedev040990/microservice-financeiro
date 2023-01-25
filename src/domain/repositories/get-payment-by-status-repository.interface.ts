import { Payment } from '../entities/payment'

export interface GetPaymentByStatusRepositoryInterface {
  getByStatus(status: string): Promise<Payment[]>
}
