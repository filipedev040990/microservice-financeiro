import { RequiredFieldsValidator } from '@/infra/validators/required-fields.validator'
import { MissingParamError } from '@/shared/errors'
import { HttpRequest } from '@/shared/types/http.types'
import { makeInput } from '@/domain/entities/payment.mock'

const makeSut = (): RequiredFieldsValidator => {
  return new RequiredFieldsValidator('person_type')
}

let sut: RequiredFieldsValidator
let input: HttpRequest
describe('RequiredFieldsValidator', () => {
  beforeEach(() => {
    sut = makeSut()
    input = makeInput()
  })

  test('should return a MissingParam error if validation fails', () => {
    input.body.person_type = null
    expect(sut.validate(input.body)).toEqual(new MissingParamError('person_type'))
  })

  test('should not return if validation succeeds', () => {
    expect(sut.validate(input.body)).toBeFalsy()
  })
})
