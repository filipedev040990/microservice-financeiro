import { SaveLogRepositoryInterface } from '@/domain/repositories/save-log-repository.interface'
import { SaveLogUseCase } from './save-payment.usecase'

const LogRepository: jest.Mocked<SaveLogRepositoryInterface> = {
  save: jest.fn()
}

const log = '{error: Teste}'

let sut
describe('SaveLogUseCase', () => {
  beforeEach(() => {
    sut = new SaveLogUseCase(LogRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should call LogRepository.save once and with correct values', async () => {
    await sut.execute(log)
    expect(LogRepository.save).toHaveBeenCalledTimes(1)
    expect(LogRepository.save).toHaveBeenCalledWith(log)
  })

  test('should return server error if LogRepository.save throw an exception', async () => {
    LogRepository.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(log)).rejects.toThrow()
  })
})
