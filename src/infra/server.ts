import 'module-alias/register'
import { app } from './app'
import { processPaymentBot } from './bots/process-payment.bot'
import config from './config'

processPaymentBot()
const port = config.server.port || 3001
app.listen(port, () => console.log(`Server running at ${port}`))
