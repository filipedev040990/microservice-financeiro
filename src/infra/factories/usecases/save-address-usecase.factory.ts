
import { SaveAddressUseCase } from '@/application/usecases'
import { AddressRepository } from '@/infra/database/mysql/repositories/address.repository'

export const makeSaveAddressUseCaseFactory = (): SaveAddressUseCase => {
  const addressRepository = new AddressRepository()
  return new SaveAddressUseCase(addressRepository)
}
