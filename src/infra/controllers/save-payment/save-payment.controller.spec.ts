import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helpers'
import { HttpRequest } from '@/shared/types/http.types'
import { SaveClientController } from './save-payment.controller'

const saveClientUseCase: jest.Mocked<SaveClientUseCaseInterface> = {
  execute: jest.fn()
}

const getClientByDocumentUsecase: jest.Mocked<GetClientByDocumentUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(null)
}

const makeSut = (): SaveClientController => {
  return new SaveClientController(getClientByDocumentUsecase, saveClientUseCase)
}

const makeInput = (): HttpRequest => ({
  body: {
    name: 'Zé das Couves',
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
    state: 'MG',
    holder_name: 'Zé das Couves',
    card_number: '123456789',
    month: '05',
    year: '2025',
    cvv: '123',
    installments: 12
  }
})

let input
let sut
describe('SaveClient', () => {
  beforeEach(() => {
    sut = makeSut()
    input = makeInput()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('should return 400 if validate required fields fails', async () => {
    const requiredFields = [
      'person_type', 'email', 'document', 'phone', 'cep', 'street', 'number', 'district', 'city', 'state',
      'holder_name', 'card_number', 'month', 'year', 'cvv', 'installments'
    ]
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

  test('should return 400 if already exists an client with document provided', async () => {
    getClientByDocumentUsecase.execute.mockReturnValueOnce(Promise.resolve(input))
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('This document already in use')))
  })

  test('should return 500 if GetClientByDocumentUseCase throws an exception', async () => {
    getClientByDocumentUsecase.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should call SaveClientUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(saveClientUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveClientUseCase.execute).toHaveBeenLastCalledWith({
      name: 'Zé das Couves',
      person_type: 'pf',
      email: 'zedascouves@gmail.com',
      document: '04631250020',
      phone: '32998523623'
    })
  })

  test('should return 500 if SaveClientUseCase throws an exception', async () => {
    saveClientUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should return an client on success', async () => {
    expect(await sut.execute(input)).toEqual(noContent())
  })
})
