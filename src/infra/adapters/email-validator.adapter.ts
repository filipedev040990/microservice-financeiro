import validator from 'validator'
import { EmailValidatorInterface } from '@/domain/validation/email-validator.interface'

export class EmailValidatorAdapter implements EmailValidatorInterface {
  execute (email: string): boolean {
    return validator.isEmail(email)
  }
}
