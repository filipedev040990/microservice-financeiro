
import { Address } from '@/domain/entities/address.entity'
import MockDate from 'mockdate'
import { AddressInput } from '@/domain/usecases/save-address-usecase.interface'

describe('Address Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should create a new instance of Address', () => {
    const input: AddressInput = {
      client_id: '1sa654ds1s3a131a31s3as',
      cep: '36200000',
      street: 'Rua Central',
      district: 'Centro',
      number: '132',
      complement: 'Fundos',
      city: 'São Paulo',
      state: 'SP'
    }

    const address = new Address(input)

    expect(address).toBeTruthy()
    expect(address).toEqual({
      client_id: '1sa654ds1s3a131a31s3as',
      cep: '36200000',
      street: 'Rua Central',
      district: 'Centro',
      number: '132',
      complement: 'Fundos',
      city: 'São Paulo',
      state: 'SP'
    })
  })
})
