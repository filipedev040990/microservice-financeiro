export interface ClientInput {
  name: string
  person_type: 'pf' | 'pj'
  email: string
  document: string
  phone: string
  created_at?: Date
}
export class Client {
  public id: string
  public name: string
  public person_type: 'pf' | 'pj'
  public email: string
  public document: string
  public phone: string
  public created_at: Date

  constructor (input: ClientInput) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}
