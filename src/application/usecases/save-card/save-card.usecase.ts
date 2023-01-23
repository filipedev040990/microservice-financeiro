import { Card } from '@/domain/entities/card.entity'
import { SaveCardRepositoryInterface } from '@/domain/repositories/save-card-repository.interface'
import { CardInput, SaveCardUseCaseInterface } from '@/domain/usecases/save-card-usecase.interface'

export class SaveCardUseCase implements SaveCardUseCaseInterface {
  constructor (private readonly cardRepository: SaveCardRepositoryInterface) {}
  async execute (input: CardInput): Promise<void> {
    const card = new Card(input)

    await this.cardRepository.save({
      client_id: input.client_id,
      holder_name: card.holder_name,
      card_number: card.card_number,
      cvv: card.cvv,
      month: card.month,
      year: card.year,
      brand: card.brand
    })
  }
}
