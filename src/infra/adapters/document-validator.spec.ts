import { DocumentValidatorAdapter } from './document-validator'

const makeSut = (): DocumentValidatorAdapter => {
  return new DocumentValidatorAdapter()
}

describe('Card Validator Adapter', () => {
  test('should return true if document validator returns true', () => {
    const sut = makeSut()
    expect(sut.execute('pf', '62986846033')).toBe(true)
  })
})
