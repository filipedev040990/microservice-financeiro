import validator from 'validator'
import { CardValidatorInterface } from '@/domain/validation/card-validator.interface'

export class CardValidatorAdapter implements CardValidatorInterface {
  execute (card: string): boolean {
    return validator.isCreditCard(card)
  }
}
