import { ValidationInterface } from '@/domain/validation/validation.interface'
import { ValidationComposite } from '@/infra/validators/validation.composite'
import { InvalidParamError, MissingParamError } from '@/shared/errors'

const emailValidatorStub: jest.Mocked<ValidationInterface> = {
  validate: jest.fn()
}

const cardValidatorStub: jest.Mocked<ValidationInterface> = {
  validate: jest.fn()
}

const validatorsStub = [emailValidatorStub, cardValidatorStub]

const makeSut = (): ValidationComposite => {
  return new ValidationComposite(validatorsStub)
}

const input = {
  anyField: 'Any Field'
}

let sut
describe('Validation Composite', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return bad request if any validation fails', () => {
    const error = new MissingParamError('field')
    validatorsStub[0].validate.mockReturnValueOnce(error)
    expect(sut.validate(input)).toEqual(error)
  })

  test('should not return if validations succeeds', () => {
    expect(sut.validate(input)).toBeFalsy()
  })

  test('should return the firt errro if more then one validation fails', () => {
    validatorsStub[0].validate.mockReturnValueOnce(new MissingParamError('field'))
    validatorsStub[1].validate.mockReturnValueOnce(new InvalidParamError('another field'))
    expect(sut.validate(input)).toEqual(new MissingParamError('field'))
  })
})
