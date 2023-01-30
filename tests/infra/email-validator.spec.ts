import { EmailValidator } from '@/infra/validators/email-validator'
import { InvalidParamError } from '@/shared/errors'
import { EmailValidatorAdapter } from './adapters/email-validator.adapter'

const emailValidatorStub: jest.Mocked<EmailValidatorAdapter> = {
  execute: jest.fn()
}

const makeSut = (): EmailValidator => {
  return new EmailValidator('email', emailValidatorStub)
}

let sut: EmailValidator
describe('EmailValidator', () => {
  beforeEach(() => {
    sut = makeSut()
  })

  test('should call EmailValidator with correct email', () => {
    sut.validate({ email: 'anyEmail@email.com' })
    expect(emailValidatorStub.execute).toHaveBeenCalledWith('anyEmail@email.com')
  })

  test('should return 400 if EmailValidatorAdapter return false', () => {
    emailValidatorStub.execute.mockReturnValueOnce(false)
    expect(sut.validate({ email: 'anyEmail@email.com' })).toEqual(new InvalidParamError('email'))
  })
})
