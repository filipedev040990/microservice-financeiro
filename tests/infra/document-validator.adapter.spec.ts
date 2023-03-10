import { DocumentValidatorAdapter } from '@/infra/adapters/document-validator'

const makeSut = (): DocumentValidatorAdapter => {
  return new DocumentValidatorAdapter()
}

describe('Card Validator Adapter', () => {
  test('should return true if document validator returns true', () => {
    const sut = makeSut()
    expect(sut.execute('pf', '62986846033')).toBe(true)
  })

  test('should return false if document validator returns false', () => {
    const sut = makeSut()
    expect(sut.execute('pf', '123456')).toBe(false)
  })

  test('should return true if document validator returns true', () => {
    const sut = makeSut()
    expect(sut.execute('pj', '12738608000105')).toBe(true)
  })

  test('should return true if document validator returns true', () => {
    const sut = makeSut()
    expect(sut.execute('pj', 'x132x13x2123x1x')).toBe(false)
  })
})
