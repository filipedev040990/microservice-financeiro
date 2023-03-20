export interface UpdatePaymentAttemptsUseCaseInterface {
  execute(paymentId: string, attempts: number): Promise<void>
}
