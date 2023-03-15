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

const paymentRepository: jest.Mocked<SavePaymentTraceRepositoryInterface> = { saveTrace: jest.fn() }

describe('SavePaymentTraceUseCase', () => {
  let sut: SavePaymentTraceUseCase
  let input: { paymentId: string, status: string }

  beforeAll(() => {
    sut = new SavePaymentTraceUseCase(paymentRepository)
    input = { paymentId: 'anyPaymentId', status: 'anyStatus' }
  })

  test('should call PaymentRepository.saveTrace once and with correct values', async () => {
    await sut.execute(input)

    expect(paymentRepository.saveTrace).toHaveBeenCalledTimes(1)
    expect(paymentRepository.saveTrace).toHaveBeenCalledWith(input)
  })

  test('should rethrow if PaymentRepository.saveTrace throws', async () => {
    paymentRepository.saveTrace.mockImplementationOnce(() => { throw new Error() })

    const promise = sut.execute(input)

    await expect(promise).rejects.toThrow()
  })
})
