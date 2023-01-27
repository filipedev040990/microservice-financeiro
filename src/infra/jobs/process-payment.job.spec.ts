import { QueueInterface } from '@/domain/queue/queue.interface'
import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { SaveLogUseCaseInterface } from '@/domain/usecases/save-log-usecase.interface'
import { UpdatePaymentAttemptsUseCaseInterface } from '@/domain/usecases/update-payment-attempts.interface'
import { UpdatePaymentStatusUseCaseInterface } from '@/domain/usecases/update-payment-status.interface'
import { ProcessPaymentJob } from './process-payment.job'
import MockDate from 'mockdate'

const makeFakePayments = (): any [] => ([
  {
    id: '13213213213212',
    installments: 1200,
    attempts_processing: 0,
    description: 'Teste',
    value: 1200,
    client: {
      id: '2056d848-3482-4585-87dc-02f2cb827552',
      email: 'zedascouves@gmail.com',
      person_type: 'pf',
      document: '123456789',
      Card: {
        holder_name: 'Zé das Couves',
        card_number: '132456798798',
        brand: 'visa',
        cvv: '132',
        month: '05',
        year: '2025'
      }
    }
  },
  {
    id: '0317984121323',
    installments: 1200,
    attempts_processing: 0,
    description: 'Compra de curso',
    value: 1500,
    client: {
      id: '2056d848-3482-4585-87dc-02f2cb84103',
      email: 'maria@gmail.com',
      person_type: 'pf',
      document: '987654321',
      Card: {
        holder_name: 'Maria Chiquinha',
        card_number: '987654321',
        brand: 'visa',
        cvv: '132',
        month: '05',
        year: '2025'
      }
    }
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
    MockDate.set(new Date())
  })
  afterEach(() => {
    jest.clearAllMocks()
    MockDate.reset()
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

  test.skip('should call UpdatePaymentAttemptsUseCase', async () => {
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
    const logInput = {
      log: JSON.stringify(new Error()),
      created_at: new Date()
    }
    expect(saveLog.execute).toHaveBeenCalledWith(logInput)
  })
})
