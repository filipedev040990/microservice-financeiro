import { ValidationInterface } from '@/domain/validation/validation.interface'

export class ValidationComposite implements ValidationInterface {
  constructor (private readonly validators: ValidationInterface []) {}
  validate (input: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }
  }
}
