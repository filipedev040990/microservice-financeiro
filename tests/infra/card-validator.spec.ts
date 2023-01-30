import { CardValidatorInterface } from '@/domain/validation/card-validator.interface'
import { CardValidator } from '@/infra/validators/card-validator'
import { InvalidParamError } from '@/shared/errors'

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

  test('should return 400 if CardValidatorAdapter return false', () => {
    cardValidatorAdapter.execute.mockReturnValueOnce(false)
    expect(sut.validate({ card: 'invalidCard13132123' })).toEqual(new InvalidParamError('card'))
  })

  test('should not return if validation succeeds', () => {
    expect(sut.validate({ card: '123456798' })).toBeFalsy()
  })
})
