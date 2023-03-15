import { SavePaymentTraceRepositoryInterface } from '@/domain/repositories/save-payment-trace-repository.interface'
import { SavePaymentTraceInterface } from '@/domain/usecases/save-payment-trace.interface'

export class SavePaymentTraceUseCase implements SavePaymentTraceInterface {
  constructor (private readonly paymentRepository: SavePaymentTraceRepositoryInterface) {}
  async execute (input: SavePaymentTraceInterface.Input): Promise<void> {
    await this.paymentRepository.saveTrace(input)
  }
}
