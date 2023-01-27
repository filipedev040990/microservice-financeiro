import { RabbitmqAdapter } from './rabbitmq.adapter'

const makeSut = (): RabbitmqAdapter => {
  return new RabbitmqAdapter('amqp://admin:admin@172.22.0.2:5672')
}

describe('RabbitmqAdapter', () => {
  test.skip('should publish an message', async () => {
    const sut = makeSut()
    const message = {
      action: 'payment_confirmed',
      client: 'joao@hotmail.com.br'
    }

    await sut.start()
    const publish = await sut.publish('amq.direct', 'payment_confirmed', JSON.stringify(message))

    expect(publish).toBeTruthy()
  })
})
