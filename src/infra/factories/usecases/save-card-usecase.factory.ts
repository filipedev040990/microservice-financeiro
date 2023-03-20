import { SaveCardUseCase } from '@/application/usecases/save-card.usecase'
import { CardRepository } from '@/infra/database/mysql/repositories/card.repository'

export const makeSaveCardUseCaseFactory = (): SaveCardUseCase => {
  const cardRepository = new CardRepository()
  return new SaveCardUseCase(cardRepository)
}
