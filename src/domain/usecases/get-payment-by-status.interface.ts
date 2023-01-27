type ClientOutput = {
  id: string
  email: string
  person_type: string
  document: string
}

type CardOutput = {
  holder_name: string
  number: string
  brand: string
  cvv: string
  month: string
  year: string
}

type PaymentOutput = {
  id: string
  installments: number
  attempts_processing: number
  description: string
  value: number
}

export type PaymentOut = {
  payment: PaymentOutput
  client: ClientOutput
  card: CardOutput
}

export interface GetPaymentByStatusUseCaseInterface {
  execute(status: string): Promise<any[]>
}
