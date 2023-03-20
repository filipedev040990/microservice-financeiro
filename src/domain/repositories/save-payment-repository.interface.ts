import { Payment } from '@/domain/entities/payment'
import { PaymentInput } from '@/domain/usecases/save-payment-usecase.interface'

export interface SavePaymentRepositoryInterface {
  save(input: PaymentInput): Promise<Payment>
}
