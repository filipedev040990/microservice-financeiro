import { Client, ClientInput } from './client.entity'
import MockDate from 'mockdate'

describe('Client Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should create a new instance of Client', () => {
    const input: ClientInput = {
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
      state: 'MG'
    }

    const client = new Client(input)

    expect(client).toBeTruthy()
    expect(client).toBeInstanceOf(Client)
    expect(client.person_type).toBe('pf')
    expect(client.email).toBe('zedascouves@gmail.com')
    expect(client.document).toBe('04631250020')
    expect(client.phone).toBe('32998523623')
    expect(client.cep).toBe('36202346')
    expect(client.street).toBe('Rua Teste')
    expect(client.number).toBe('123')
    expect(client.complement).toBe('')
    expect(client.district).toBe('Centro')
    expect(client.city).toBe('Barbacena')
    expect(client.state).toBe('MG')
    expect(client.created_at).toEqual(new Date())
  })
})
