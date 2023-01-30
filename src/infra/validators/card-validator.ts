import { ValidationInterface } from '@/domain/validation/validation.interface'
import { InvalidParamError } from '@/shared/errors'
import { CardValidatorAdapter } from '../adapters/card-validator.adapter'

export class CardValidator implements ValidationInterface {
  constructor (private readonly cardValidatorAdapter: CardValidatorAdapter) {}
  validate (input: any): Error {
    const cardValid = this.cardValidatorAdapter.execute(input.card)
    if (!cardValid) {
      return new InvalidParamError('card')
    }
  }
}
