import { DocumentValidator } from '@/infra/validators/document-validator'
import { DocumentValidatorAdapter } from '@/infra/adapters/document-validator'
import { InvalidParamError } from '@/shared/errors'

const documentValidatorAdapterStub: jest.Mocked<DocumentValidatorAdapter> = {
  execute: jest.fn().mockReturnValue(true)
}

const makeSut = (): DocumentValidator => {
  return new DocumentValidator(documentValidatorAdapterStub)
}

let sut: DocumentValidator

describe('DocumentValidator', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should call DocumentValidator with correct values', () => {
    sut.validate({ person_type: 'pf', document: '123456789' })
    expect(documentValidatorAdapterStub.execute).toHaveBeenCalledWith('pf', '123456789')
  })

  test('should return Invalid Param Error if validation fails', () => {
    documentValidatorAdapterStub.execute.mockReturnValueOnce(false)
    expect(sut.validate({ person_type: 'pf', document: '123456789' })).toEqual(new InvalidParamError('cpf'))
  })

  test('should not return if validation succeeds', () => {
    expect(sut.validate({ person_type: 'pf', document: '123456789' })).toBeFalsy()
  })
})
