
import { Client } from '@/domain/entities/client.entity'
import { GetClientByDocumentRepositoryInterface } from '@/domain/repositories/get-client-by-document-repository.interface'
import MockDate from 'mockdate'
import { GetClientByDocumentUseCase } from '@/application/usecases/get-client-by-document.usecase'

const makeSut = (): GetClientByDocumentUseCase => {
  return new GetClientByDocumentUseCase(clientRepository)
}

const makeFakeClient = (): Client => ({
  id: 'any id',
  name: 'Zé das Couves',
  person_type: 'pf',
  email: 'zedascouves@gmail.com',
  document: '04631250020',
  phone: '32998523623',
  created_at: new Date('2023-01-20')
})

const clientRepository: jest.Mocked<GetClientByDocumentRepositoryInterface> = {
  getByDocument: jest.fn().mockResolvedValue(makeFakeClient())
}

let sut
describe('GetClientByDocumentUseCase', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  beforeAll(() => {
    MockDate.set(new Date('2023-01-20'))
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call ClientRepository.getByDocument once and with correct document', async () => {
    await sut.execute('04631250020')
    expect(clientRepository.getByDocument).toHaveBeenCalledTimes(1)
    expect(clientRepository.getByDocument).toHaveBeenCalledWith('04631250020')
  })
  test('should return an client', async () => {
    expect(await sut.execute('04631250020')).toEqual(makeFakeClient())
  })
  test('should return null if ClientRepository.getByDocument return null', async () => {
    clientRepository.getByDocument.mockReturnValueOnce(null)
    expect(await sut.execute('04631250020')).toBeNull()
  })

  test('should return server error if ClientRepository.save throw an exception', async () => {
    clientRepository.getByDocument.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute('04631250020')).rejects.toThrow()
  })
})
