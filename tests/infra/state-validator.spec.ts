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
    const response = sut.validate({ state: 'ANY' })
    expect(response).toEqual(new InvalidParamError('state'))
  })
})
