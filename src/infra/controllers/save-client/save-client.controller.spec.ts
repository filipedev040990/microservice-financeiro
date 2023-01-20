import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest } from '@/shared/helpers/http.helpers'
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

let input
let sut
describe('SaveClientController', () => {
  beforeEach(() => {
    sut = makeSut()
    input = makeInput()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return 400 if validate required fields fails', async () => {
    const requiredFields = ['person_type', 'email', 'document', 'phone', 'cep', 'street', 'number', 'district', 'city', 'state']
    for (const field of requiredFields) {
      input.body[field] = null
      expect(await sut.execute(input)).toEqual(badRequest(new MissingParamError(field)))
      input.body[field] = field
    }
  })

  test('should call GetClientByDocumentUseCase once and with correct document', async () => {
    await sut.execute(input)

    expect(getClientByDocumentUsecase.execute).toHaveBeenCalledTimes(1)
    expect(getClientByDocumentUsecase.execute).toHaveBeenLastCalledWith('04631250020')
  })
})
