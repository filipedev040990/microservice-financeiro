import { ValidationInterface } from '@/domain/validation/validation.interface'
import validator from 'validator'

export class CardValidatorAdapter implements ValidationInterface {
  validate (card: string): Error {
    if (!validator.isCreditCard(card)) {
      return false
    }
  }
}
