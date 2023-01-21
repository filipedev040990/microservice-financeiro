export interface CardInput {
  holder_name: string
  card_number: string
  month: string
  year: string
  cvv: string
  installments: number
}

export interface SaveCardUseCase {
  execute(input: CardInput): Promise<void>
}
