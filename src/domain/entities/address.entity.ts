export interface AddressInput {
  client_id: string
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

export class Address {
  public client_id: string
  public cep: string
  public street: string
  public number: string
  public complement: string
  public district: string
  public city: string
  public state: string

  constructor (input: AddressInput) {
    Object.assign(this, input)
  }
}
