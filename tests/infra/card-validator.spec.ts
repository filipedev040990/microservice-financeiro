import { CardValidatorInterface } from '@/domain/validation/card-validator.interface'
import { CardValidator } from '@/infra/validators/card-validator'

const cardValidatorAdapter: jest.Mocked<CardValidatorInterface> = {
  execute: jest.fn().mockReturnValue(true)
}

const makeSut = (): CardValidator => {
  return new CardValidator(cardValidatorAdapter)
}

let sut: CardValidator

describe('CardValidator', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call CardValidatorAdapter with correct card', () => {
    sut.validate({ card: '123456789' })
    expect(cardValidatorAdapter.execute).toHaveBeenCalledWith('123456789')
  })
})
