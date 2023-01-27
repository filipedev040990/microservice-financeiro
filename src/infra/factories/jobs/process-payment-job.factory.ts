import { GetPaymentByStatusUseCase, UpdatePaymentUseCase, UpdatePaymentAttemptsUseCase } from '@/application/usecases'
import { SaveLogUseCase } from '@/application/usecases/save-log/save-payment.usecase'
import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import { LogRepository } from '@/infra/database/mysql/repositories/log.repository'
import { PaymentRepository } from '@/infra/database/mysql/repositories/payment.repository'
import { ProcessPaymentJob } from '@/infra/jobs/process-payment.job'
import config from '@/infra/config'

export const makeProcessPaymentJobFactory = (): ProcessPaymentJobInterface => {
  const paymentRepository = new PaymentRepository()
  const getPaymentByStatus = new GetPaymentByStatusUseCase(paymentRepository)
  const updatePaymentStatus = new UpdatePaymentUseCase(paymentRepository)
  const queue = new RabbitmqAdapter(config.rabbitmq.uri)
  const updatePaymentAttempts = new UpdatePaymentAttemptsUseCase(paymentRepository)
  const logRepository = new LogRepository()
  const log = new SaveLogUseCase(logRepository)
  return new ProcessPaymentJob(getPaymentByStatus, updatePaymentStatus, queue, updatePaymentAttempts, log)
}
