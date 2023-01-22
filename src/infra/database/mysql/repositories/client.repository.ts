import { Client } from '@/domain/entities/client.entity'
import { ClientInput, GetClientByDocumentRepositoryInterface, SaveClientRepositoryInterface } from '@/domain/interfaces'
import { prismaClient } from './prisma-client'

export class ClientRepository implements SaveClientRepositoryInterface, GetClientByDocumentRepositoryInterface {
  async save (input: ClientInput): Promise<Client> {
    return await prismaClient.client.create({
      data: {
        name: input.name,
        email: input.email,
        person_type: input.person_type,
        document: input.document,
        phone: input.phone,
        created_at: input.created_at
      }
    })
  }

  async getByDocument (document: string): Promise<Client> {
    const client = await prismaClient.client.findFirst({ where: { document } })
    return client || null
  }
}
