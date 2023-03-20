import { ValidationInterface } from '@/domain/validation/validation.interface'
import { MissingParamError } from '@/shared/errors'

export class RequiredFieldsValidator implements ValidationInterface {
  constructor (private readonly fieldName: string) {}
  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
