export interface SavePaymentTraceInterface {
  execute (input: SavePaymentTraceInterface.Input): Promise<void>
}

export namespace SavePaymentTraceInterface {
  export type Input = {
    paymentId: string
    status: string
  }
}
