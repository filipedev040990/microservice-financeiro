import { StateValidator } from '@/infra/validators/state-validator'
import { InvalidParamError } from '@/shared/errors'

const makeSut = (): StateValidator => {
  return new StateValidator()
}

let sut: StateValidator

describe('StateValidator', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return 400 if Validate fails', () => {
    expect(sut.validate({ state: 'ANY' })).toEqual(new InvalidParamError('state'))
  })

  test('should not return if validation succeeds', () => {
    expect(sut.validate({ state: 'MG' })).toBeFalsy()
  })
})
