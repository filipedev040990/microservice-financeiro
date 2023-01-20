import { HttpResponse } from '../types/http.types'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})
