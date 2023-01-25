import { Payment } from '@/domain/entities/payment'
import { GetPaymentByStatusRepositoryInterface } from '@/domain/repositories/get-payment-by-status-repository.interface'
import { GetPaymentByStatusUseCase } from './get-payment-by-status.usecase'

const makePayment = (): Payment [] => ([{
  id: 'any id',
  client_id: '123456789',
  status: 'waiting',
  attempts_processing: 0,
  description: 'Compra de curso',
  installments: 12,
  value: 1200
}])

const paymentRepository: jest.Mocked<GetPaymentByStatusRepositoryInterface> = {
  getByStatus: jest.fn().mockResolvedValue(makePayment())
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

  test('should return an payment on success', async () => {
    const response = await sut.execute('waiting')
    expect(response).toBeTruthy()
    expect(response).toEqual(makePayment())
  })

  test('should return empty if PaymentRepository.getByStatus returns null', async () => {
    paymentRepository.getByStatus.mockReturnValueOnce(Promise.resolve([]))
    expect(await sut.execute('waiting')).toEqual([])
  })
})
