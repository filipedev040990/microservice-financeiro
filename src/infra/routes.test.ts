import request from 'supertest'
import { app } from './app'

describe('Payments routes', () => {
  test.skip('should create an new payment', async () => {
    await request(app)
      .post('/api/payments')
      .send({
        name: 'Zé das Couves',
        person_type: 'pf',
        email: 'zedascouves@gmail.com',
        document: '04631250020',
        phone: '32998523623',
        cep: '36202346',
        street: 'Rua Teste',
        number: '123',
        complement: '',
        district: 'Centro',
        city: 'Barbacena',
        state: 'MG',
        holder_name: 'Zé das Couves',
        card_number: '123456789',
        month: '05',
        year: '2025',
        cvv: '123',
        installments: 12
      })
      .expect(204)
  })
})
