import { DocumentValidator } from '@/infra/validators/document-validator'
import { DocumentValidatorAdapter } from '@/infra/adapters/document-validator'

const documentValidatorAdapterStub: jest.Mocked<DocumentValidatorAdapter> = {
  execute: jest.fn()
}

const makeSut = (): DocumentValidator => {
  return new DocumentValidator('cpf', documentValidatorAdapterStub)
}

let sut: DocumentValidator

describe('DocumentValidator', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  test('should call DocumentValidator with correct values', () => {
    sut.validate({ document: '123456789' })
    expect(documentValidatorAdapterStub.execute).toHaveBeenCalledWith('cpf', '123456789')
  })
})
