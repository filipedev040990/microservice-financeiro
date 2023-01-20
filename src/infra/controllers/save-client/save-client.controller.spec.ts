import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { HttpRequest } from '@/shared/types/http.types'
import { SaveClientController } from './save-client.controller'

const saveClientUseCase: jest.Mocked<SaveClientUseCaseInterface> = {
  execute: jest.fn()
}

const getClientByDocumentUsecase: jest.Mocked<GetClientByDocumentUseCaseInterface> = {
  execute: jest.fn()
}

const makeSut = (): SaveClientController => {
  return new SaveClientController(getClientByDocumentUsecase, saveClientUseCase)
}

const makeInput = (): HttpRequest => ({
  body: {
    person_type: 'pf',
    email: 'zedascouves@gmail.com',
    document: '04631250020',
    phone: '32998523623',
    cep: '36202346',
    street: 'Rua Teste',
    number: '123',
    complement: '',
    district: 'Centro',
    city: 'Barbacena',
    state: 'MG'
  }
})

describe('SaveClientController', () => {
  test('should call GetClientByDocumentUseCase once and with correct document', async () => {
    const sut = makeSut()
    const input = makeInput()
    await sut.execute(input)

    expect(getClientByDocumentUsecase.execute).toHaveBeenCalledTimes(1)
    expect(getClientByDocumentUsecase.execute).toHaveBeenLastCalledWith('04631250020')
  })
})
