import { SavePaymentTraceRepositoryInterface } from '@/domain/repositories/save-payment-trace-repository.interface'
import { SavePaymentTraceInterface } from '@/domain/usecases/save-payment-trace.interface'
import { prismaClient } from './prisma-client'

export class PaymentTraceRepository implements SavePaymentTraceRepositoryInterface {
  async saveTrace (input: SavePaymentTraceInterface.Input): Promise<void> {
    await prismaClient.paymentTrace.create({
      data: {
        payment_id: input.paymentId,
        status: input.status
      }
    })
  }
}
