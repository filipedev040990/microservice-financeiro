import { Payment } from '@/domain/entities/payment'
const input = {
  client_id: '123456789',
  status: 'waiting',
  attempts_processing: 0,
  description: 'Compra de curso',
  installments: 12,
  value: 1200
}

describe('Payment', () => {
  test('should create an Payment instance', () => {
    const payment = new Payment(input)
    expect(payment).toBeTruthy()
    expect(payment).toEqual(input)
  })
})
