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
      phone: '32998523623'
    }

    const client = new Client(input)

    expect(client).toBeTruthy()
    expect(client).toBeInstanceOf(Client)
    expect(client.person_type).toBe('pf')
    expect(client.email).toBe('zedascouves@gmail.com')
    expect(client.document).toBe('04631250020')
    expect(client.phone).toBe('32998523623')
    expect(client.created_at).toEqual(new Date())
  })
})
