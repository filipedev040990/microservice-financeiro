import { ValidationInterface } from '@/domain/validation/validation.interface'
import { InvalidParamError } from '@/shared/errors'
import { DocumentValidatorAdapter } from '../adapters/document-validator'

export class DocumentValidator implements ValidationInterface {
  constructor (private readonly documentValidtorAdapter: DocumentValidatorAdapter) {}

  validate (input: any): Error {
    const documentValid = this.documentValidtorAdapter.execute(input.person_type, input.document)
    if (!documentValid) {
      const documentType = input.person_type === 'pf' ? 'cpf' : 'cnpj'
      return new InvalidParamError(documentType)
    }
  }
}
