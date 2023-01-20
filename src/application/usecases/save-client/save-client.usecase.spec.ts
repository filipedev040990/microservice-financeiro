import { ClientInput } from '@/domain/entities/client.entity'
import { SaveClientRepositoryInterface } from '@/domain/repositories/save-client-repository.interface'
import { SaveClientUseCase } from './save-client.usecase'
import MockDate from 'mockdate'

const clientRepository: jest.Mocked<SaveClientRepositoryInterface> = {
  save: jest.fn()
}

const makeSut = (): SaveClientUseCase => {
  return new SaveClientUseCase(clientRepository)
}

const makeInput = (): ClientInput => ({
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
  created_at: new Date()
})

describe('SaveClientUseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call ClientRepository.save once and with correct values', async () => {
    const sut = makeSut()
    const input = makeInput()
    await sut.execute(input)

    expect(clientRepository.save).toHaveBeenCalledTimes(1)
    expect(clientRepository.save).toHaveBeenCalledWith({
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
      created_at: new Date()
    })
  })
})
