type ClientOutput = {
  id: string
  holder_name: string
  email: string
  person_type: string
  document: string
}

type CardOutput = {
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
}

export type PaymentOut = {
  client: ClientOutput
  card: CardOutput
  payment: PaymentOutput
}

export interface GetPaymentByStatusUseCaseInterface {
  execute(status: string): Promise<PaymentOut[]>
}
