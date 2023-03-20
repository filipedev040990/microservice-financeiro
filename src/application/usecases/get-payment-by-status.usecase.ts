import { GetPaymentByStatusRepositoryInterface } from '@/domain/repositories/get-payment-by-status-repository.interface'
import { GetPaymentByStatusUseCaseInterface, PaymentOut } from '@/domain/usecases/get-payment-by-status.interface'

export class GetPaymentByStatusUseCase implements GetPaymentByStatusUseCaseInterface {
  constructor (private readonly paymentRepository: GetPaymentByStatusRepositoryInterface) {}
  async execute (status: string): Promise<PaymentOut[]> {
    return await this.paymentRepository.getByStatus(status)
  }
}
