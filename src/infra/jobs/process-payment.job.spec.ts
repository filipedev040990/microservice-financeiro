import { GetPaymentByStatusUseCaseInterface } from '@/domain/usecases/get-payment-by-status.interface'
import { ProcessPaymentJob } from './process-payment.job'

const getPaymentByStatus: jest.Mocked<GetPaymentByStatusUseCaseInterface> = {
  execute: jest.fn()
}

const makeSut = (): ProcessPaymentJob => {
  return new ProcessPaymentJob(getPaymentByStatus)
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
})
