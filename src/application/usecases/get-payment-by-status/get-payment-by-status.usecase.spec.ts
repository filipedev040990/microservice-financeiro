import { GetPaymentByStatusRepositoryInterface } from '@/domain/repositories/get-payment-by-status-repository.interface'
import { GetPaymentByStatusUseCase } from './get-payment-by-status.usecase'

const paymentRepository: jest.Mocked<GetPaymentByStatusRepositoryInterface> = {
  getByStatus: jest.fn()
}

const makeSut = (): GetPaymentByStatusUseCase => {
  return new GetPaymentByStatusUseCase(paymentRepository)
}

let sut
describe('GetPaymentByStatusUseCase', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call PaymentRepository.getByStatus once and with correct values', async () => {
    await sut.execute('waiting')
    expect(paymentRepository.getByStatus).toHaveBeenCalledTimes(1)
    expect(paymentRepository.getByStatus).toHaveBeenCalledWith('waiting')
  })

  test('should return null if PaymentRepository.getByStatus returns null', async () => {
    const response = await sut.execute('waiting')
    paymentRepository.getByStatus.mockReturnValueOnce(null)
    expect(response).toBeNull()
  })
})
