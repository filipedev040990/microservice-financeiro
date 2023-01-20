import { ServerError } from '../errors/server.error'
import { HttpResponse } from '../types/http.types'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})
