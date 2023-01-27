import { Client } from '@/domain/entities/client.entity'

export const makeFakeClient = (): Client => ({
  id: 'any id',
  name: 'Zé das Couves',
  person_type: 'pf',
  email: 'zedascouves@gmail.com',
  document: '04631250020',
  phone: '32998523623',
  created_at: new Date('2023-01-20')
})
