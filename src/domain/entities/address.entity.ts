import { AddressInput } from '../usecases/save-address-usecase.interface'

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
