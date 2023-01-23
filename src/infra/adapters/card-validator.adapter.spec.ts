import { CardValidatorAdapter } from './card-validator.adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isCreditCard: () => {
    return true
  }
}))

const makeSut = (): CardValidatorAdapter => {
  return new CardValidatorAdapter()
}

describe('Card Validator Adapter', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    expect(sut.execute('123456789')).toBe(true)
  })

  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isCreditCard').mockReturnValueOnce(false)
    expect(sut.execute('123456789')).toBe(false)
  })
})
