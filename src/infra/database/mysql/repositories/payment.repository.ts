import { PaymentInput, SavePaymentRepositoryInterface } from '@/domain'
import { GetPaymentByStatusRepositoryInterface } from '@/domain/repositories/get-payment-by-status-repository.interface'
import { UpdatePaymentAttemptsRepositoryInterface } from '@/domain/repositories/update-payment-attempts-repository.interface'
import { UpdatePaymentRepositoryInterface } from '@/domain/repositories/update-payment-repository.interface'
import { prismaClient } from './prisma-client'

export class PaymentRepository implements SavePaymentRepositoryInterface, UpdatePaymentAttemptsRepositoryInterface, UpdatePaymentRepositoryInterface, GetPaymentByStatusRepositoryInterface {
  async save (input: PaymentInput): Promise<void> {
    await prismaClient.payment.create({
      data: {
        client_id: input.client_id,
        status: input.status,
        attempts_processing: input.attempts_processing,
        value: input.value,
        installments: input.installments,
        description: input.description,
        created_at: input.created_at
      }
    })
  }

  async updateAttempts (paymentId: string, attempts: number): Promise<void> {
    await prismaClient.payment.update({
      where: {
        id: paymentId
      },
      data: {
        attempts_processing: attempts
      }
    })
  }

  async updateStatus (paymentId: string, status: string): Promise<void> {
    await prismaClient.payment.update({
      where: {
        id: paymentId
      },
      data: {
        status
      }
    })
  }

  async getByStatus (status: string): Promise<any[]> {
    const payments = await prismaClient.payment.findMany({
      select: {
        id: true,
        installments: true,
        attempts_processing: true,
        description: true,
        value: true,
        client: {
          select: {
            id: true,
            email: true,
            person_type: true,
            document: true,
            Card: {
              select: {
                holder_name: true,
                card_number: true,
                brand: true,
                cvv: true,
                month: true,
                year: true
              }
            }
          }
        }
      },
      where: {
        status: {
          equals: status
        }
      }
    })
    return payments
  }
}
