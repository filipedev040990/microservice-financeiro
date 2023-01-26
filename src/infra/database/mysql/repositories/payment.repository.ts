import { PaymentInput, SavePaymentRepositoryInterface } from '@/domain'
import { prismaClient } from './prisma-client'

export class PaymentRepository implements SavePaymentRepositoryInterface {
  async save (input: PaymentInput): Promise<void> {
    await prismaClient.payment.create({
      data: {
        client_id: input.client_id,
        status: input.status,
        attempts_processing: input.attempts_processing,
        value: input.value,
        installments: input.installments,
        description: input.description
      }
    })
  }
}
