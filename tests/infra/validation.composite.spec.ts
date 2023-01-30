import { ValidationInterface } from '@/domain/validation/validation.interface'
import { ValidationComposite } from '@/infra/validators/validation.composite'
import { MissingParamError } from '@/shared/errors'

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
})
