import { PaymentInput } from '../usecases/save-payment-usecase.interface'

export interface SavePaymentRepositoryInterface {
  save(input: PaymentInput): Promise<void>
}
