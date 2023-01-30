import { ValidationInterface } from '@/domain/validation/validation.interface'
import { DocumentValidatorAdapter } from '../adapters/document-validator'

export class DocumentValidator implements ValidationInterface {
  constructor (
    private readonly documentType: string,
    private readonly documentValidtorAdapter: DocumentValidatorAdapter
  ) {}

  validate (input: any): Error {
    this.documentValidtorAdapter.execute(this.documentType, input.document)
    return null
  }
}
