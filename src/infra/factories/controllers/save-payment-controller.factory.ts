import { SavePaymentController } from '@/infra/controllers/save-payment/save-payment.controller'
import { makeGetClientByDocumentUsecaseFactory } from '../usecases/get-client-by-document-usecase.factory'
import { makeSaveAddressUseCaseFactory } from '../usecases/save-address-usecase.factory'
import { makeSaveCardUseCaseFactory } from '../usecases/save-card-usecase.factory'
import { makeSaveClientUseCaseFactory } from '../usecases/save-client-usecase.factory'
import { makeSavePaymentTraceUseCaseFactory } from '../usecases/save-payment-trace-usecase.factory'
import { makeSavePaymentUseCaseFactory } from '../usecases/save-payment-usecase.factory'
import { makeValidationComposite } from './validation-composite.factory'

export const makeSavePaymentControllerFactory = (): SavePaymentController => {
  return new SavePaymentController(
    makeGetClientByDocumentUsecaseFactory(),
    makeSaveClientUseCaseFactory(),
    makeSaveAddressUseCaseFactory(),
    makeSaveCardUseCaseFactory(),
    makeSavePaymentUseCaseFactory(),
    makeValidationComposite(),
    makeSavePaymentTraceUseCaseFactory()
  )
}
