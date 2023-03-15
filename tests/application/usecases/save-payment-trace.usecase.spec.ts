export interface SavePaymentTraceRepositoryInterface {
  saveTrace (input: SavePaymentTraceUseCase.Input): Promise<void>
}

export namespace SavePaymentTraceUseCase {
  export type Input = {
    paymentId: string
    status: string
  }
}

export class SavePaymentTraceUseCase {
  constructor (private readonly paymentRepository: SavePaymentTraceRepositoryInterface) {}
  async execute (input: SavePaymentTraceUseCase.Input): Promise<void> {
    await this.paymentRepository.saveTrace(input)
  }
}

describe('SavePaymentTraceUseCase', () => {
  test('should call PaymentRepository.saveTrace once and with correct values', async () => {
    const paymentRepository: jest.Mocked<SavePaymentTraceRepositoryInterface> = { saveTrace: jest.fn() }
    const sut = new SavePaymentTraceUseCase(paymentRepository)
    const input = { paymentId: 'anyPaymentId', status: 'anyStatus' }
    await sut.execute(input)

    expect(paymentRepository.saveTrace).toHaveBeenCalledTimes(1)
    expect(paymentRepository.saveTrace).toHaveBeenCalledWith(input)
  })

  test('should rethrow if PaymentRepository.saveTrace throws', async () => {
    const paymentRepository: jest.Mocked<SavePaymentTraceRepositoryInterface> = { saveTrace: jest.fn() }
    paymentRepository.saveTrace.mockImplementationOnce(() => {
      throw new Error()
    })

    const sut = new SavePaymentTraceUseCase(paymentRepository)
    const input = { paymentId: 'anyPaymentId', status: 'anyStatus' }
    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow()
  })
})
