import { ClientRepository } from './client.repository'

let sut: ClientRepository
describe('ClientRepository', () => {
  beforeEach(() => {
    sut = new ClientRepository()
  })

  test.skip('should insert an  new client', async () => {
    const client = await sut.save({
      name: 'Filipe Siqueira',
      email: 'filipe@email.com',
      person_type: 'pf',
      document: '123456789',
      phone: '321132123132123',
      created_at: new Date()
    })

    expect(client).toBeTruthy()
    expect(client).toHaveProperty('id')
    expect(client.name).toBe('Filipe Siqueira')
  })
})
