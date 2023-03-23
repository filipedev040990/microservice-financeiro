import { SaveClientRepositoryInterface } from '@/domain/repositories/save-client-repository.interface'
import { SaveClientUseCase } from '@/application/usecases/save-client.usecase'
import MockDate from 'mockdate'
import { ClientInput } from '@/domain/usecases/save-client-usecase.interface'
import { makeFakeClient } from '@/domain/entities/client.mock'

const clientRepository: jest.Mocked<SaveClientRepositoryInterface> = {
  save: jest.fn().mockReturnValue(makeFakeClient())
}

const makeSut = (): SaveClientUseCase => {
  return new SaveClientUseCase(clientRepository)
}

const makeInput = (): ClientInput => ({
  name: 'Zé das Couves',
  person_type: 'pf',
  email: 'zedascouves@gmail.com',
  document: '04631250020',
  phone: '32998523623',
  external_code: 'anyExternalCode',
  created_at: new Date()
})

let sut: SaveClientUseCase
let input: ClientInput
describe('SaveClientUseCase', () => {
  beforeEach(() => {
    sut = makeSut()
    input = makeInput()
  })
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call ClientRepository.save once and with correct values', async () => {
    await sut.execute(input)
    expect(clientRepository.save).toHaveBeenCalledTimes(1)
    expect(clientRepository.save).toHaveBeenCalledWith(input)
  })

  test('should return an client on success', async () => {
    expect(await sut.execute(input)).toEqual(makeFakeClient())
  })

  test('should return server error if ClientRepository.save throw an exception', async () => {
    clientRepository.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(input)).rejects.toThrow()
  })
})
