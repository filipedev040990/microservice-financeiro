import { AddressInput, SaveAddressRepositoryInterface } from '@/domain'
import { prismaClient } from './prisma-client'

export class AddressRepository implements SaveAddressRepositoryInterface {
  async save (input: AddressInput): Promise<void> {
    await prismaClient.address.create({
      data: {
        client_id: input.client_id,
        cep: input.cep,
        street: input.street,
        number: input.number,
        complement: input.complement,
        district: input.district,
        city: input.city,
        state: input.state
      }
    })
  }
}
