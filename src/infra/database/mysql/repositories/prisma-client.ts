import { PrismaClient } from '@prisma/client'

const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    }
  ]
})

prismaClient.$on('query', async (e) => {
  // console.log(`${e.query} ${e.params}`)
})

export { prismaClient }
