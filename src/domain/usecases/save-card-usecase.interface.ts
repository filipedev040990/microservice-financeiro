export interface CardInput {
  holder_name: string
  card_number: string
  month: string
  year: string
  cvv: string
}

export interface SaveCardUseCaseInterface {
  execute(input: CardInput): Promise<void>
}
