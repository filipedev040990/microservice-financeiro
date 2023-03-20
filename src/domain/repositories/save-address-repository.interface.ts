import { AddressInput } from '../usecases/save-address-usecase.interface'

export interface SaveAddressRepositoryInterface {
  save(input: AddressInput): Promise<void>
}
