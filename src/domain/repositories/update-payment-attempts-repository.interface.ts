export interface UpdatePaymentAttemptsRepositoryInterface {
  updateAttempts(paymentId: string, attempts: number): Promise<void>
}
