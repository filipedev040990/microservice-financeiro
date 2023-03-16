import { GetPaymentByStatusUseCase, UpdatePaymentUseCase, UpdatePaymentAttemptsUseCase, SavePaymentTraceUseCase } from '@/application/usecases'
import { ProcessPaymentJobInterface } from '@/domain/jobs/process-payment-job.interface'
import { RabbitmqAdapter } from '@/infra/adapters/rabbitmq.adapter'
import { LogRepository } from '@/infra/database/mysql/repositories/log.repository'
import { PaymentRepository } from '@/infra/database/mysql/repositories/payment.repository'
import { ProcessPaymentJob } from '@/infra/jobs/process-payment.job'
import config from '@/infra/config'
import { SaveLogUseCase } from '@/application/usecases/save-log.usecase'
import { PaymentTraceRepository } from '@/infra/database/mysql/repositories/payment-trace.repository'

export const makeProcessPaymentJobFactory = (): ProcessPaymentJobInterface => {
  const paymentRepository = new PaymentRepository()
  const getPaymentByStatus = new GetPaymentByStatusUseCase(paymentRepository)
  const updatePaymentStatus = new UpdatePaymentUseCase(paymentRepository)
  const queue = new RabbitmqAdapter(config.rabbitmq.uri)
  const updatePaymentAttempts = new UpdatePaymentAttemptsUseCase(paymentRepository)
  const logRepository = new LogRepository()
  const log = new SaveLogUseCase(logRepository)
  const paymentTraceRepository = new PaymentTraceRepository()
  const paymentTraceUseCase = new SavePaymentTraceUseCase(paymentTraceRepository)
  return new ProcessPaymentJob(getPaymentByStatus, updatePaymentStatus, queue, updatePaymentAttempts, log, paymentTraceUseCase)
}
