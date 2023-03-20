export interface UpdatePaymentStatusUseCaseInterface {
  execute(paymentId: string, status: string): Promise<void>
}
