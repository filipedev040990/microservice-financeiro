import schedule from 'node-schedule'
import { makeProcessPaymentJobFactory } from '../factories/jobs/process-payment-job.factory'

const processPaymentBot = (): void => {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const job = makeProcessPaymentJobFactory()
    await job.execute()
  })
}

export { processPaymentBot }
