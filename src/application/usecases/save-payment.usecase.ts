import { Payment } from '@/domain/entities/payment'
import { SavePaymentRepositoryInterface } from '@/domain/repositories/save-payment-repository.interface'
import { PaymentInput, SavePaymentUseCaseInterface } from '@/domain/usecases/save-payment-usecase.interface'

export class SavePaymentUseCase implements SavePaymentUseCaseInterface {
  constructor (private readonly paymentRepository: SavePaymentRepositoryInterface) {}
  async execute (input: PaymentInput): Promise<void> {
    const payment = new Payment(input)

    await this.paymentRepository.save({
      client_id: payment.client_id,
      status: payment.status,
      attempts_processing: 0,
      description: payment.description,
      installments: payment.installments,
      value: payment.value,
      created_at: payment.created_at
    })
  }
}
