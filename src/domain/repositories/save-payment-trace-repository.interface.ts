import { SavePaymentTraceInterface } from '@/domain/usecases/save-payment-trace.interface'

export interface SavePaymentTraceRepositoryInterface {
  saveTrace (input: SavePaymentTraceInterface.Input): Promise<void>
}
