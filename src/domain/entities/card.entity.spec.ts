import { CardInput } from '../usecases/save-card-usecase.interface'
import { Card } from './card.entity'

describe('Card Entity', () => {
  test('should create an instance of Card', () => {
    const input: CardInput = {
      holder_name: 'Zé das Couves',
      card_number: '123456789',
      cvv: '132',
      month: '05',
      year: '2025'
    }

    const card = new Card(input)

    expect(card).toBeTruthy()
    expect(card).toEqual({
      holder_name: 'Zé das Couves',
      card_number: '123456789',
      cvv: '132',
      month: '05',
      year: '2025'
    })
  })
})