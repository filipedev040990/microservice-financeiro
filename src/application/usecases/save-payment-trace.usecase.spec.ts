import { SavePaymentTraceUseCase } from '@/application/usecases'
import { SavePaymentTraceRepositoryInterface } from '@/domain/repositories/save-payment-trace-repository.interface'

const paymentRepository: jest.Mocked<SavePaymentTraceRepositoryInterface> = { saveTrace: jest.fn() }

describe('SavePaymentTraceUseCase', () => {
  let sut: SavePaymentTraceUseCase
  let input: { paymentId: string, status: string }

  beforeAll(() => {
    sut = new SavePaymentTraceUseCase(paymentRepository)
    input = { paymentId: 'anyPaymentId', status: 'anyStatus' }
  })

  test('should call PaymentRepository.saveTrace once and with correct values', async () => {
    await sut.execute(input)

    expect(paymentRepository.saveTrace).toHaveBeenCalledTimes(1)
    expect(paymentRepository.saveTrace).toHaveBeenCalledWith(input)
  })

  test('should rethrow if PaymentRepository.saveTrace throws', async () => {
    paymentRepository.saveTrace.mockImplementationOnce(() => { throw new Error() })

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow()
  })
})
