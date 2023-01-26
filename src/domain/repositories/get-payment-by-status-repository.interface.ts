import { PaymentOut } from '../usecases/get-payment-by-status.interface'

export interface GetPaymentByStatusRepositoryInterface {
  getByStatus(status: string): Promise<PaymentOut[]>
}
