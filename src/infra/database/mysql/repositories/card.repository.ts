import { CardInput, SaveCardRepositoryInterface } from '@/domain'
import { prismaClient } from './prisma-client'

export class CardRepository implements SaveCardRepositoryInterface {
  async save (input: CardInput): Promise<void> {
    await prismaClient.card.create({
      data: {
        client_id: input.client_id,
        holder_name: input.holder_name,
        card_number: input.card_number,
        cvv: input.cvv,
        month: input.month,
        year: input.year,
        brand: input.brand
      }
    })
  }
}
