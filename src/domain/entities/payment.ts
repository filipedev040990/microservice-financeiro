import { PaymentInput } from '../usecases/save-payment-usecase.interface'

export class Payment {
  public id: string
  public client_id: string
  public status: string
  public attempts_processing: number
  public description: string
  public installments: number
  public value: number
  public created_at: Date

  constructor (input: PaymentInput) {
    this.created_at = new Date()
    Object.assign(this, input)
  }
}
