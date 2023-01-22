import { SavePaymentUseCase } from '@/application/usecases/save-payment/save-payment.usecase'
import { PaymentRepository } from '@/infra/database/mysql/repositories/payment.repository'

export const makeSavePaymentUseCaseFactory = (): SavePaymentUseCase => {
  const paymentRepository = new PaymentRepository()
  return new SavePaymentUseCase(paymentRepository)
}
