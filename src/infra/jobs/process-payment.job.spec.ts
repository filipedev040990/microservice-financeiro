import { Payment } from '@/domain/entities/payment'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { UpdatePaymentStatusUseCaseInterface } from '@/domain/usecases/update-payment-status.interface'
import { ProcessPaymentJob } from './process-payment.job'

const makeFakePayments = (): Payment [] => ([
  {
    id: '123456789',
    client_id: '123456789',
    status: 'waiting',
    attempts_processing: 0,
    description: 'Compra de curso',
    installments: 12,
    value: 1200
  },
  {
    id: '987654321',
    client_id: '987654312',
    status: 'waiting',
    attempts_processing: 0,
    description: 'Compra de curso',
    installments: 1,
    value: 1200
  }
])

const getPaymentByStatus: jest.Mocked<GetPaymentByStatusUseCaseInterface> = {
  execute: jest.fn().mockResolvedValue(makeFakePayments())
}

const updatePaymentStatus: jest.Mocked<UpdatePaymentStatusUseCaseInterface> = {
  execute: jest.fn()
}

const makeSut = (): ProcessPaymentJob => {
  return new ProcessPaymentJob(getPaymentByStatus, updatePaymentStatus)
}

let sut
describe('ProcessPaymentJob', () => {
  beforeEach(() => {
    sut = makeSut()
  })

  test('should call GetPaymentByStatusUseCase with correct status', async () => {
    await sut.execute('waiting')
    expect(getPaymentByStatus.execute).toHaveBeenCalledWith('waiting')
  })

  test('should call UpdatePaymentStatusUseCase with correct values', async () => {
    await sut.execute('waiting')
    expect(updatePaymentStatus.execute).toHaveBeenCalled()
  })
})
