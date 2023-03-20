import { ValidationInterface } from '@/domain/validation/validation.interface'
import constants from '@/shared/constants'
import { InvalidParamError } from '@/shared/errors'

export class StateValidator implements ValidationInterface {
  validate (input: any): Error {
    if (!constants.STATES.includes(input.state)) {
      return new InvalidParamError('state')
    }
  }
}
