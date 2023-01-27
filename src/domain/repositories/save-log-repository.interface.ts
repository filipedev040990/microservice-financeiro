export type LogInput = {
  log: string
  created_at: Date
}

export interface SaveLogRepositoryInterface {
  save(log: LogInput): Promise<void>
}
