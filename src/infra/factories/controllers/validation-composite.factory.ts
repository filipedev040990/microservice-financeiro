import { ValidationInterface } from '@/domain/validation/validation.interface'
import { CardValidatorAdapter } from '@/infra/adapters/card-validator.adapter'
import { DocumentValidatorAdapter } from '@/infra/adapters/document-validator'
import { EmailValidatorAdapter } from '@/infra/adapters/email-validator.adapter'
import { CardValidator } from '@/infra/validators/card-validator'
import { DocumentValidator } from '@/infra/validators/document-validator'
import { EmailValidator } from '@/infra/validators/email-validator'
import { RequiredFieldsValidator } from '@/infra/validators/required-fields.validator'
import { StateValidator } from '@/infra/validators/state-validator'
import { ValidationComposite } from '@/infra/validators/validation.composite'

export const makeValidationComposite = (): ValidationInterface => {
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

  return new ValidationComposite(validations)
}
