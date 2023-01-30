import { ValidationInterface } from '@/domain/validation/validation.interface'
import { CardValidatorAdapter } from '../adapters/card-validator.adapter'

export class CardValidator implements ValidationInterface {
  constructor (private readonly cardValidatorAdapter: CardValidatorAdapter) {}
  validate (input: any): Error {
    this.cardValidatorAdapter.execute(input.card)
    return null
  }
}
