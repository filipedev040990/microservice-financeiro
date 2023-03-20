import { ClientInput } from '../usecases/save-client-usecase.interface'

export class Client {
  public id: string
  public name: string
  public person_type: string
  public email: string
  public document: string
  public phone: string
  public created_at: Date

  constructor (input: ClientInput) {
    Object.assign(this, input)
    this.created_at = new Date()
  }
}
