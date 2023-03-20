import { SavePaymentTraceUseCase } from '@/application/usecases'
import { PaymentTraceRepository } from '@/infra/database/mysql/repositories/payment-trace.repository'

export const makeSavePaymentTraceUseCaseFactory = (): SavePaymentTraceUseCase => {
  const paymentTraceRepository = new PaymentTraceRepository()
  return new SavePaymentTraceUseCase(paymentTraceRepository)
}
