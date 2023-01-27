import { EmailValidatorAdapter } from '@/infra/adapters/email-validator.adapter'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail: () => {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('Email Validator Adapter', () => {
  test('should return true if validator returns true', () => {
    const sut = makeSut()
    expect(sut.execute('validEmail@email.com')).toBe(true)
  })

  test('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    expect(sut.execute('invalidEmail@email.com')).toBe(false)
  })
})
