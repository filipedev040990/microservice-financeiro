export interface UpdatePaymentRepositoryInterface {
  updateStatus(paymentId: string, status: string): Promise<void>
}
