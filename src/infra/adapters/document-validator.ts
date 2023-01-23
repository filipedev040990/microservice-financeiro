import { cnpj, cpf } from 'cpf-cnpj-validator'
import { DocumentValidatorInterface } from '@/domain/validation/document-validator.interface'

export class DocumentValidatorAdapter implements DocumentValidatorInterface {
  execute (documentType: string, value: string): boolean {
    const document = documentType === 'pf' ? cpf : cnpj
    return document.isValid(value)
  }
}
