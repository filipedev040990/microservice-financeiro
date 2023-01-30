import { ValidationInterface } from '@/domain/validation/validation.interface'
import { InvalidParamError } from '@/shared/errors'
import { DocumentValidatorAdapter } from '../adapters/document-validator'

export class DocumentValidator implements ValidationInterface {
  constructor (
    private readonly documentType: string,
    private readonly documentValidtorAdapter: DocumentValidatorAdapter
  ) {}

  validate (input: any): Error {
    const documentValid = this.documentValidtorAdapter.execute(this.documentType, input.document)
    if (!documentValid) {
      return new InvalidParamError(this.documentType)
    }
  }
}
