import { CardInput } from '../usecases/save-card-usecase.interface'

export interface SaveCardRepositoryInterface {
  save(input: CardInput): Promise<void>
}
