import { SaveAddressUseCase } from '@/application/usecases/save-address/save-address.usecase'
import { AddressRepository } from '@/infra/database/mysql/repositories/address.repository'

export const makeSaveAddressUseCaseFactory = (): SaveAddressUseCase => {
  const addressRepository = new AddressRepository()
  return new SaveAddressUseCase(addressRepository)
}
