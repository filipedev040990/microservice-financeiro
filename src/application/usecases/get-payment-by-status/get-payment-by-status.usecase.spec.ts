import { PaymentOut } from '@/domain'
import { GetPaymentByStatusRepositoryInterface } from '@/domain/repositories/get-payment-by-status-repository.interface'
import { GetPaymentByStatusUseCase } from './get-payment-by-status.usecase'

const makePayment = (): PaymentOut [] => ([{
  client: {
    id: '2056d848-3482-4585-87dc-02f2cb827552',
    holder_name: 'Zé das Couves',
    email: 'zedascouves@gmail.com',
    person_type: 'pf',
    document: '123456789'
  },
  card: {
    number: '132456798798',
    brand: 'visa',
    cvv: '132',
    month: '05',
    year: '2025'
  },
  payment: {
    id: '13213213213212',
    installments: 1200,
    attempts_processing: 0,
    description: 'Teste'
  }
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
