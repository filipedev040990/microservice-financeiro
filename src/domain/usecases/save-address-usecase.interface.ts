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

export interface SaveAddressUseCaseInterface {
  execute(input: AddressInput): Promise<void>
}
