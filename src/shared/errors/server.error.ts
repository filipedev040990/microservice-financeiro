export class ServerError extends Error {
  constructor (error: Error) {
    super('Internal server error')
    this.name = 'ServerError'
    this.message = error.message
    this.stack = error.stack
  }
}
