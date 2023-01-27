import { CardInput } from '@/domain/usecases/save-card-usecase.interface'
import { Card } from '@/domain/entities/card.entity'

describe('Card Entity', () => {
  test('should create an instance of Card', () => {
    const input: CardInput = {
      client_id: '123456789',
      holder_name: 'Zé das Couves',
      card_number: '123456789',
      cvv: '132',
      month: '05',
      year: '2025',
      brand: 'visa'
    }

    const card = new Card(input)

    expect(card).toBeTruthy()
    expect(card).toEqual({
      client_id: '123456789',
      holder_name: 'Zé das Couves',
      card_number: '123456789',
      cvv: '132',
      month: '05',
      year: '2025',
      brand: 'visa'
    })
  })
})
