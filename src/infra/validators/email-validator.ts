import { ValidationInterface } from '@/domain/validation/validation.interface'
import { EmailValidatorInterface } from '@/domain/validation/email-validator.interface'
import { InvalidParamError } from '@/shared/errors'

export class EmailValidator implements ValidationInterface {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidatorInterface
  ) {}

  validate (input: any): Error {
    const emailValid = this.emailValidator.execute(input[this.fieldName])
    if (!emailValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
