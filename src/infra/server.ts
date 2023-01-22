import 'module-alias/register'
import { app } from './app'
import config from './config'

const port = config.server.port || 3001
app.listen(port, () => console.log(`Server running at ${port}`))
