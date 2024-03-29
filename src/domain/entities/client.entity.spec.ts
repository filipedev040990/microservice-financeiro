import { Client } from '@/domain/entities/client.entity'
import MockDate from 'mockdate'
import { ClientInput } from '@/domain/usecases/save-client-usecase.interface'

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
      external_code: 'anyExternalCode'
    }

    const client = new Client(input)

    expect(client).toBeTruthy()
    expect(client).toBeInstanceOf(Client)
    expect(client.person_type).toBe('pf')
    expect(client.email).toBe('zedascouves@gmail.com')
    expect(client.document).toBe('04631250020')
    expect(client.phone).toBe('32998523623')
    expect(client.external_code).toBe('anyExternalCode')
    expect(client.created_at).toEqual(new Date())
  })
})
