import { UpdatePaymentRepositoryInterface } from '@/domain/repositories/update-payment-repository.interface'
import { UpdatePaymentUseCase } from './update-payment-status'

const paymentRepository: jest.Mocked<UpdatePaymentRepositoryInterface> = {
  updateStatus: jest.fn()
}

const makeSut = (): UpdatePaymentUseCase => {
  return new UpdatePaymentUseCase(paymentRepository)
}

let sut
describe('UpdatePaymentUseCase', () => {
  beforeEach(() => {
    sut = makeSut()
  })

  test('should call PaymentRepository.updateStatus once and with correct status', async () => {
    await sut.execute('anyID', 'processing')
    expect(paymentRepository.updateStatus).toHaveBeenCalledTimes(1)
    expect(paymentRepository.updateStatus).toHaveBeenCalledWith('anyID', 'processing')
  })
})
