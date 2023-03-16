import { ValidationInterface } from '@/domain/validation/validation.interface'
import { makeValidationComposite } from '@/infra/factories/controllers/validation-composite.factory'
import { RequiredFieldsValidator } from '@/infra/validators/required-fields.validator'
import { ValidationComposite } from '@/infra/validators/validation.composite'
import { EmailValidatorAdapter } from '@/infra/adapters/email-validator.adapter'
import { EmailValidator } from '@/infra/validators/email-validator'
import { DocumentValidator } from '@/infra/validators/document-validator'
import { DocumentValidatorAdapter } from '@/infra/adapters/document-validator'
import { StateValidator } from '@/infra/validators/state-validator'
import { CardValidator } from '@/infra/validators/card-validator'
import { CardValidatorAdapter } from '@/infra/adapters/card-validator.adapter'

jest.mock('@/infra/validators/validation.composite')

describe('ValidatonComposite', () => {
  test('should call Validation with all validations', () => {
    makeValidationComposite()

    const validations: ValidationInterface [] = []

    const requiredFields = [
      'person_type', 'email', 'document', 'phone',
      'cep', 'street', 'number', 'district', 'city', 'state', 'brand',
      'holder_name', 'card_number', 'month', 'year', 'cvv', 'installments'
    ]
    for (const fieldName of requiredFields) {
      validations.push(new RequiredFieldsValidator(fieldName))
    }

    validations.push(new EmailValidator('email', new EmailValidatorAdapter()))
    validations.push(new DocumentValidator(new DocumentValidatorAdapter()))
    validations.push(new StateValidator())
    validations.push(new CardValidator(new CardValidatorAdapter()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
