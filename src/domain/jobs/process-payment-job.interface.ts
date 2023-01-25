export interface ProcessPaymentJobInterface {
  execute(): Promise<void>
}
