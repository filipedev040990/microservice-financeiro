export interface DocumentValidatorInterface {
  execute(documentType: string, value: string): boolean
}
