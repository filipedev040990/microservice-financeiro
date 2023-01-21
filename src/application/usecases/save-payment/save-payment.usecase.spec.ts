import { SavePaymentRepositoryInterface } from '@/domain/repositories/save-payment-repository.interface'
import { PaymentInput } from '@/domain/usecases/save-payment-usecase.interface'
import { SavePaymentUseCase } from './save-payment.usecase'

const paymentRepository: jest.Mocked<SavePaymentRepositoryInterface> = {
  save: jest.fn()
}

const input: PaymentInput = {
  client_id: '123456789',
  status: 'waiting',
  attempts_processing: 0,
  description: 'Compra de curso',
  installments: 12,
  value: 1200
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
})
