import { SaveAddressRepositoryInterface } from '@/domain/repositories/save-address-repository.interface'
import { AddressInput } from '@/domain/usecases/save-address-usecase.interface'
import { SaveAddressUseCase } from '@/application/usecases/save-address.usecase'

const addressRepository: jest.Mocked<SaveAddressRepositoryInterface> = {
  save: jest.fn()
}

let sut: SaveAddressUseCase
let input: AddressInput

describe('SaveAddressUseCase', () => {
  beforeEach(() => {
    sut = new SaveAddressUseCase(addressRepository)
    input = {
      client_id: '1sa654ds1s3a131a31s3as',
      cep: '36200000',
      street: 'Rua Central',
      district: 'Centro',
      number: '132',
      complement: 'Fundos',
      city: 'São Paulo',
      state: 'SP'
    }
  })

  test('should call AddressRepository.save once and with correct values', async () => {
    await sut.execute(input)
    expect(addressRepository.save).toHaveBeenCalledTimes(1)
    expect(addressRepository.save).toHaveBeenCalledWith(input)
  })

  test('should return server error if AddressRepository.save throw an exception', async () => {
    addressRepository.save.mockImplementationOnce(() => {
      throw new Error()
    })
    await expect(sut.execute(input)).rejects.toThrow()
  })
})
