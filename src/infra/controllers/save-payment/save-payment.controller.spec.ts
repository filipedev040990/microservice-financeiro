import { GetClientByDocumentUseCaseInterface } from '@/domain/usecases/get-client-by-document'
import { SaveAddressUseCaseInterface } from '@/domain/usecases/save-address-usecase.interface'
import { SaveClientUseCaseInterface } from '@/domain/usecases/save-client-usecase.interface'
import { InvalidParamError } from '@/shared/errors/invalid-param.error'
import { MissingParamError } from '@/shared/errors/missing-param.error'
import { badRequest, serverError } from '@/shared/helpers/http.helpers'
import { HttpRequest } from '@/shared/types/http.types'
import { SavePaymentController } from './save-payment.controller'

const saveClientUseCase: jest.Mocked<SaveClientUseCaseInterface> = {
  execute: jest.fn()
}

const getClientByDocumentUsecase: jest.Mocked<GetClientByDocumentUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(null)
}

const saveAddressUseCase: jest.Mocked<SaveAddressUseCaseInterface> = {
  execute: jest.fn()
}

const makeSut = (): SavePaymentController => {
  return new SavePaymentController(getClientByDocumentUsecase, saveClientUseCase, saveAddressUseCase)
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
      'person_type', 'email', 'document', 'phone', 'cep',
      'street', 'number', 'district', 'city', 'state',
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

  test('should call SaveAddressUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(saveAddressUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveAddressUseCase.execute).toHaveBeenLastCalledWith({
      cep: '36202346',
      street: 'Rua Teste',
      number: '123',
      complement: '',
      district: 'Centro',
      city: 'Barbacena',
      state: 'MG'
    })
  })

  test('should return 500 if SaveAddressUseCase throws an exception', async () => {
    saveAddressUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })
})