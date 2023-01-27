import { UpdatePaymentAttemptsRepositoryInterface } from '@/domain/repositories/update-payment-attempts-repository.interface'
import { UpdatePaymentAttemptsUseCase } from '@/application/usecases/update-payment-attempts'

const paymentRepository: jest.Mocked<UpdatePaymentAttemptsRepositoryInterface> = {
  updateAttempts: jest.fn()
}

const makeSut = (): UpdatePaymentAttemptsUseCase => {
  return new UpdatePaymentAttemptsUseCase(paymentRepository)
}

let sut
describe('UpdatePaymentAttemptsUseCase', () => {
  beforeEach(() => {
    sut = makeSut()
  })

  test('should call PaymentRepository.updateAttempts once and with correct status', async () => {
    await sut.execute('anyID', 1)
    expect(paymentRepository.updateAttempts).toHaveBeenCalledTimes(1)
    expect(paymentRepository.updateAttempts).toHaveBeenCalledWith('anyID', 1)
  })

  test('should return server error if PaymentRepository.updateAttempts throws', async () => {
    paymentRepository.updateAttempts.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute('anyID', 1)).rejects.toThrow()
  })
})
