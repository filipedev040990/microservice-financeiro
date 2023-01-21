export interface PaymentInput {
  client_id: string
  status: string
  value: number
  attempts_processing: number
  installments: number
  description: string
}

export interface SavePaymentUseCaseInterface {
  execute(input: PaymentInput): Promise<void>
}
