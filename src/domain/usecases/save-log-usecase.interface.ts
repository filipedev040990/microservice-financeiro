export interface SaveLogUseCaseInterface {
  execute(log: string): Promise<void>
}
