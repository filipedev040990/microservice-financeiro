import { LogInput, SaveLogRepositoryInterface } from '@/domain/repositories/save-log-repository.interface'
import { SaveLogUseCase } from '@/application/usecases/save-log.usecase'

const input: LogInput = {
  log: '{error: Teste}',
  created_at: new Date()
}

const logRepository: jest.Mocked<SaveLogRepositoryInterface> = {
  save: jest.fn()
}
let sut
describe('SaveLogUseCase', () => {
  beforeEach(() => {
    sut = new SaveLogUseCase(logRepository)
    jest.resetAllMocks()
  })

  test('should call LogRepository.save once and with correct values', async () => {
    await sut.execute(input)
    expect(logRepository.save).toHaveBeenCalledTimes(1)
    expect(logRepository.save).toHaveBeenCalledWith(input)
  })

  test('should return server error if LogRepository.save throw an exception', async () => {
    logRepository.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(input)).rejects.toThrow()
  })
})
