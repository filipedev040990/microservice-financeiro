export class Log {
  public id: string
  public log: string
  public created_at: Date

  constructor (input: string) {
    this.log = input
    this.created_at = new Date()
  }
}
