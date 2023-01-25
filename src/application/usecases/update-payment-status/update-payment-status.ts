import { UpdatePaymentRepositoryInterface } from '@/domain/repositories/update-payment-repository.interface'
import { UpdatePaymentStatusUseCaseInterface } from '@/domain/usecases/update-payment-status.interface'

export class UpdatePaymentUseCase implements UpdatePaymentStatusUseCaseInterface {
  constructor (private readonly paymentRepository: UpdatePaymentRepositoryInterface) {}
  async execute (paymentId: string, status: string): Promise<void> {
    await this.paymentRepository.updateStatus(paymentId, status)
  }
}
