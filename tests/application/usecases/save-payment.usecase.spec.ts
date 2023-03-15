import { SavePaymentRepositoryInterface } from '@/domain/repositories/save-payment-repository.interface'
import { PaymentInput } from '@/domain/usecases/save-payment-usecase.interface'
import { SavePaymentUseCase } from '@/application/usecases/save-payment.usecase'

const input: PaymentInput = {
  client_id: '123456789',
  status: 'waiting',
  attempts_processing: 0,
  description: 'Compra de curso',
  installments: 12,
  value: 1200,
  created_at: new Date()
}

const paymentRepository: jest.Mocked<SavePaymentRepositoryInterface> = {
  save: jest.fn().mockResolvedValue(input)
}

let sut
describe('SavePaymentUseCase', () => {
  beforeEach(() => {
    sut = new SavePaymentUseCase(paymentRepository)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should call PaymentRepository.save once and with correct values', async () => {
    await sut.execute(input)
    expect(paymentRepository.save).toHaveBeenCalledTimes(1)
    expect(paymentRepository.save).toHaveBeenCalledWith(input)
  })

  test('should return an Payment on success', async () => {
    const payment = await sut.execute(input)

    expect(payment).toMatchObject(input)
  })

  test('should return server error if PaymentRepository.save throw an exception', async () => {
    paymentRepository.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(input)).rejects.toThrow()
  })
})
