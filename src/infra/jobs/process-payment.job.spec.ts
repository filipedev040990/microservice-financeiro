import { Payment } from '@/domain/entities/payment'
import { QueueInterface } from '@/domain/queue/queue.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { SaveLogUseCaseInterface } from '@/domain/usecases/save-log-usecase.interface'
import { UpdatePaymentAttemptsUseCaseInterface } from '@/domain/usecases/update-payment-attempts.interface'
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

const updatePaymentAttempts: jest.Mocked<UpdatePaymentAttemptsUseCaseInterface> = {
  execute: jest.fn()
}

const queue: jest.Mocked<QueueInterface> = {
  start: jest.fn(),
  publish: jest.fn(),
  consume: jest.fn(),
  close: jest.fn()
}

const saveLog: jest.Mocked<SaveLogUseCaseInterface> = {
  execute: jest.fn()
}

const makeSut = (): ProcessPaymentJob => {
  return new ProcessPaymentJob(getPaymentByStatus, updatePaymentStatus, queue, updatePaymentAttempts, saveLog)
}

let sut
describe('ProcessPaymentJob', () => {
  beforeEach(() => {
    sut = makeSut()
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call GetPaymentByStatusUseCase with correct status', async () => {
    await sut.execute()
    expect(getPaymentByStatus.execute).toHaveBeenCalledTimes(1)
    expect(getPaymentByStatus.execute).toHaveBeenCalledWith('waiting')
  })

  test('should enqueue payments to processing if attempts is less than or equal to three', async () => {
    await sut.execute()
    expect(queue.publish).toHaveBeenCalledTimes(2)
  })

  test('should not enqueue payments to processing if attempts is greater than to three', async () => {
    const payments = makeFakePayments()
    payments[0].attempts_processing = 4
    payments[1].attempts_processing = 4
    getPaymentByStatus.execute.mockResolvedValueOnce(payments)
    await sut.execute()
    expect(queue.publish).toHaveBeenCalledTimes(0)
  })

  test('should call UpdatePaymentAttemptsUseCase', async () => {
    await sut.execute()
    expect(updatePaymentAttempts.execute).toHaveBeenCalledTimes(2)
  })

  test.skip('should call UpdatePaymentStatusUseCase', async () => {
    await sut.execute()
    expect(updatePaymentStatus.execute).toHaveBeenCalledTimes(2)
  })

  test('should call SaveLogUseCase if process payment fails', async () => {
    getPaymentByStatus.execute.mockImplementationOnce(() => {
      throw new Error()
    })
    await sut.execute()
    expect(saveLog.execute).toHaveBeenCalledWith(JSON.stringify(new Error()))
  })
})
