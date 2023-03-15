import { Payment } from '@/domain/entities/payment'

export interface PaymentInput {
  client_id: string
  status: string
  value: number
  attempts_processing: number
  installments: number
  description: string
  created_at: Date
}

export interface SavePaymentUseCaseInterface {
  execute(input: PaymentInput): Promise<Payment>
}
