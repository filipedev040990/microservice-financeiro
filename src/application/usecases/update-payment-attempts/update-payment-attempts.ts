import { UpdatePaymentAttemptsRepositoryInterface } from '@/domain/repositories/update-payment-attempts-repository.interface'
import { UpdatePaymentAttemptsUseCaseInterface } from '@/domain/usecases/update-payment-attempts.interface'

export class UpdatePaymentAttemptsUseCase implements UpdatePaymentAttemptsUseCaseInterface {
  constructor (private readonly paymentRepository: UpdatePaymentAttemptsRepositoryInterface) {}
  async execute (paymentId: string, attempts: number): Promise<void> {
    await this.paymentRepository.updateAttempts(paymentId, attempts)
  }
}
