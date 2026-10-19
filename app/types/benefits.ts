export type BenefitCategory = 'meal' | 'food' | 'transport'

export interface Benefit {
  id: string
  name: string
  category: BenefitCategory
  balance: number
  active: boolean
}

export interface BenefitSummary {
  totalBalance: number
  activeBenefits: number
  totalBenefits: number
}