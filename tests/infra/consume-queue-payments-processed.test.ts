import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'

describe('ConsumeQueueConfirmedPayment', () => {
  test.skip('should consume queue payments_processed', async () => {
    const queue = new RabbitmqAdapter('amqp://admin:admin@172.22.0.3:5672')
    await queue.start()

    const payload = {
      payment_id: '2ae9006a-b576-4c00-a5b4-2ff5d4c44bce',
      status: 'confirmed',
      email: 'filipe@hotmail.com.br'
    }

    const published = await queue.publish('financeiro_payments_processed', 'financeiro_payments_processed', JSON.stringify(payload))
    if (!published) {
      throw new Error()
    }
    await queue.consume('payments_processed', async (message: any) => {
      console.log(message.content.toString())
    })
  })
})
