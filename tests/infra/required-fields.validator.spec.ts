import { RequiredFieldsValidator } from '@/infra/validators/required-fields.validator'
import { MissingParamError } from '@/shared/errors'

const makeSut = (): RequiredFieldsValidator => {
  return new RequiredFieldsValidator()
}

const sut = makeSut()
describe('RequiredFieldsValidator', () => {
  test('should return a MissingParam error if validation fails', () => {
    expect(sut.validate({ body: {} })).toEqual(new MissingParamError('person_type'))
  })
})
