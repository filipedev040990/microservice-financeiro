import { Payment } from '@/domain/entities/payment'
import { GetPaymentByStatusRepositoryInterface } from '@/domain/repositories/get-payment-by-status-repository.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'

export class GetPaymentByStatusUseCase implements GetPaymentByStatusUseCaseInterface {
  constructor (private readonly paymentRepository: GetPaymentByStatusRepositoryInterface) {}
  async execute (status: string): Promise<Payment> {
    const payment = await this.paymentRepository.getByStatus(status)
    return payment || null
  }
}
