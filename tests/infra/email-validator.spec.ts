import { EmailValidator } from '@/infra/validators/email-validator'
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
})
