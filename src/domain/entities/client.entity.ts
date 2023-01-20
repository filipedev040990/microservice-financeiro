export interface ClientInput {
  person_type: 'pf' | 'pj'
  email: string
  document: string
  phone: string
  cep: string
  street: string
  number: string
  complement: string
  district: string
  city: string
  state: string
}

export interface ClientOutput {
  id: string
  client: ClientInput
  created_at: Date
}

export class Client {
  public id: string
  public created_at: Date
  public person_type: 'pf' | 'pj'
  public email: string
  public document: string
  public phone: string
  public cep: string
  public street: string
  public number: string
  public complement: string
  public district: string
  public city: string
  public state: string

  constructor (readonly input: ClientInput) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}
