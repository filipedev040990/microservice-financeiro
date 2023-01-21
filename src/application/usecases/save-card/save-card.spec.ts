import { SaveCardRepositoryInterface } from '@/domain/repositories/save-card-repository.interface'
import { CardInput } from '@/domain/usecases/save-card-usecase.interface'
import { SaveCardUseCase } from './save-card.usecase'

const input: CardInput = {
  holder_name: 'Zé das Couves',
  card_number: '123456789',
  month: '05',
  year: '2025',
  cvv: '123'
}

const cardRepository: jest.Mocked<SaveCardRepositoryInterface> = {
  save: jest.fn()
}
let sut
describe('SaveCardUseCase', () => {
  beforeEach(() => {
    sut = new SaveCardUseCase(cardRepository)
    jest.resetAllMocks()
  })

  test('should call CardRepository.save once and with correct values', async () => {
    await sut.execute(input)
    expect(cardRepository.save).toHaveBeenCalledTimes(1)
    expect(cardRepository.save).toHaveBeenCalledWith(input)
  })

  test('should return server error if CardRepository.save throw an exception', async () => {
    cardRepository.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(input)).rejects.toThrow()
  })
})
