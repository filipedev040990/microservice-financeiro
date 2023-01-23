import { CardInput } from '../usecases/save-card-usecase.interface'

export class Card {
  public id: string
  public holder_name: string
  public card_number: string
  public month: string
  public year: string
  public cvv: string
  public brand: string

  constructor (input: CardInput) {
    Object.assign(this, input)
  }
}
