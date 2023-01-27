import { Address } from '@/domain/entities/address.entity'
import { SaveAddressRepositoryInterface } from '@/domain/repositories/save-address-repository.interface'
import { AddressInput, SaveAddressUseCaseInterface } from '@/domain/usecases/save-address-usecase.interface'

export class SaveAddressUseCase implements SaveAddressUseCaseInterface {
  constructor (private readonly addressRepository: SaveAddressRepositoryInterface) {}
  async execute (input: AddressInput): Promise<void> {
    const address = new Address(input)
    await this.addressRepository.save({
      client_id: address.client_id,
      cep: address.cep,
      street: address.street,
      district: address.district,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state
    })
  }
}
