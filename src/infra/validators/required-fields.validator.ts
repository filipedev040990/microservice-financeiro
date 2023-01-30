import { ValidationInterface } from '@/domain/validation/validation.interface'
import { MissingParamError } from '@/shared/errors'

export class RequiredFieldsValidator implements ValidationInterface {
  validate (input: any): Error {
    const requiredFields = [
      'person_type', 'email', 'document', 'phone',
      'cep', 'street', 'number', 'district', 'city', 'state', 'brand',
      'holder_name', 'card_number', 'month', 'year', 'cvv', 'installments'
    ]
    for (const field of requiredFields) {
      if (!input.body[field]) {
        return new MissingParamError(field)
      }
    }
  }
}
