import { Router } from 'express'
import { expressRouterAdapter } from './adapters/express-router.adapter'
import { makeSavePaymentControllerFactory } from './factories/controllers/save-payment-controller.factory'

const router = Router()

router.post('/payments', expressRouterAdapter(makeSavePaymentControllerFactory()))

export { router }
