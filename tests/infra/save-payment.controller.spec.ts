import { GetClientByDocumentUseCaseInterface, SaveAddressUseCaseInterface, SaveCardUseCaseInterface, SaveClientUseCaseInterface, SavePaymentUseCaseInterface } from '@/domain'
import { CardValidatorInterface } from '@/domain/validation/card-validator.interface'
import { DocumentValidatorInterface } from '@/domain/validation/document-validator.interface'
import { EmailValidatorInterface } from '@/domain/validation/email-validator.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { badRequest, noContent, serverError } from '@/shared/helpers/http.helpers'
import { SavePaymentController } from '@/infra/controllers/save-payment/save-payment.controller'
import { makeInput } from '../mocks/payment.mock'

const saveClientUseCase: jest.Mocked<SaveClientUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue({
    id: '123456789',
    name: 'Zé das Couves',
    person_type: 'pf',
    email: 'zedascouves@gmail.com',
    document: '04631250020',
    phone: '32998523623'
  })
}

const getClientByDocumentUsecase: jest.Mocked<GetClientByDocumentUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(null)
}

const saveAddressUseCase: jest.Mocked<SaveAddressUseCaseInterface> = {
  execute: jest.fn()
}

const saveCardUseCase: jest.Mocked<SaveCardUseCaseInterface> = {
  execute: jest.fn()
}

const savePaymentUseCase: jest.Mocked<SavePaymentUseCaseInterface> = {
  execute: jest.fn()
}

const emailValidator: jest.Mocked<EmailValidatorInterface> = {
  execute: jest.fn().mockReturnValue(true)
}
const documentValidator: jest.Mocked<DocumentValidatorInterface> = {
  execute: jest.fn().mockReturnValue(true)
}
const cardValidator: jest.Mocked<CardValidatorInterface> = {
  execute: jest.fn().mockReturnValue(true)
}

const makeSut = (): SavePaymentController => {
  return new SavePaymentController(getClientByDocumentUsecase, saveClientUseCase, saveAddressUseCase, saveCardUseCase, savePaymentUseCase, emailValidator, documentValidator, cardValidator)
}

let input
let sut
describe('SaveClient', () => {
  beforeEach(() => {
    sut = makeSut()
    input = makeInput()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return 400 if validate required fields fails', async () => {
    const requiredFields = [
      'person_type', 'email', 'document', 'phone', 'cep',
      'street', 'number', 'district', 'city', 'state',
      'holder_name', 'card_number', 'month', 'year', 'cvv', 'installments', 'cvv'
    ]
    for (const field of requiredFields) {
      input.body[field] = null
      expect(await sut.execute(input)).toEqual(badRequest(new MissingParamError(field)))
      input.body[field] = field
    }
  })

  test('should return call Email Validator with correct email', async () => {
    await sut.execute(input)
    expect(emailValidator.execute).toHaveBeenCalledWith('zedascouves@gmail.com')
  })

  test('should return 400 if Email Validator fails', async () => {
    emailValidator.execute.mockReturnValueOnce(false)
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('should call Document Validator with correct values', async () => {
    await sut.execute(input)
    expect(documentValidator.execute).toHaveBeenCalledWith('pf', '04631250020')
  })

  test('should return 400 if Email Validator fails', async () => {
    documentValidator.execute.mockReturnValueOnce(false)
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('document')))
  })

  test('should call stateValidate with correct state', async () => {
    const spy = jest.spyOn(sut, 'stateValidate')
    await sut.execute(input)
    expect(spy).toHaveBeenCalledWith('MG')
  })

  test('should return 400 if State Validator fails', async () => {
    jest.spyOn(sut, 'stateValidate').mockReturnValueOnce(false)
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('state')))
  })

  test('should call CardValidator with correct values', async () => {
    await sut.execute(input)
    expect(cardValidator.execute).toHaveBeenCalledWith('123456789')
  })

  test('should return 400 if Card Validator fails', async () => {
    cardValidator.execute.mockReturnValueOnce(false)
    expect(await sut.execute(input)).toEqual(badRequest(new InvalidParamError('card')))
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
      client_id: '123456789',
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

  test('should call SaveCardUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(saveCardUseCase.execute).toHaveBeenCalledTimes(1)
    expect(saveCardUseCase.execute).toHaveBeenLastCalledWith({
      client_id: '123456789',
      holder_name: 'Zé das Couves',
      card_number: '123456789',
      month: '05',
      year: '2025',
      cvv: '123',
      brand: 'visa'
    })
  })

  test('should return 500 if SaveCardUseCase throws an exception', async () => {
    saveCardUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should call SavePaymentUseCase once and with correct values', async () => {
    await sut.execute(input)
    expect(savePaymentUseCase.execute).toHaveBeenCalledTimes(1)
    expect(savePaymentUseCase.execute).toHaveBeenLastCalledWith({
      client_id: '123456789',
      status: 'waiting',
      value: 1200,
      attempts_processing: 0,
      installments: 12,
      description: 'Compra de curso'
    })
  })

  test('should return 500 if SaveCardUseCase throws an exception', async () => {
    savePaymentUseCase.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    expect(await sut.execute(input)).toEqual(serverError(new Error()))
  })

  test('should return 204 on sucess', async () => {
    expect(await sut.execute(input)).toEqual(noContent())
  })
})