export interface BreachData {
  Name: string
  Title: string
  Domain: string
  BreachDate: string
  AddedDate: string
  ModifiedDate: string
  PwnCount: number
  Description: string
  LogoPath: string
  DataClasses: string[]
  IsVerified: boolean
  IsFabricated: boolean
  IsSensitive: boolean
  IsRetired: boolean
  IsSpamList: boolean
  IsMalware: boolean
  IsSubscriptionFree: boolean
}

export interface PasteData {
  Source: string
  Id: string
  Title: string
  Date: string
  EmailCount: number
}

export interface PasswordGeneratorOptions {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}
