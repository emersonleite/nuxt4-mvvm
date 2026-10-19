import type { Benefit } from '../../app/types/benefits'

const initialBenefits: Benefit[] = [
  { id: 'benefit-1', name: 'Vale-refeição', category: 'meal', balance: 1250.5, active: true },
  { id: 'benefit-2', name: 'Vale-alimentação', category: 'food', balance: 820, active: true },
  { id: 'benefit-3', name: 'Auxílio-transporte', category: 'transport', balance: 280.75, active: true },
  { id: 'benefit-4', name: 'Saldo flexível', category: 'food', balance: 435.2, active: false },
  { id: 'benefit-5', name: 'Mobilidade extra', category: 'transport', balance: 96.4, active: true },
  { id: 'benefit-6', name: 'Benefício bem-estar', category: 'meal', balance: 150, active: false },
]

// Store em memória para fins de demonstração. Reiniciar o servidor restaura os dados.
const globalStore = globalThis as typeof globalThis & {
  __demoBenefits?: Benefit[]
}

if (!globalStore.__demoBenefits) {
  globalStore.__demoBenefits = initialBenefits.map((benefit) => ({ ...benefit }))
}

export function listBenefits(): Benefit[] {
  return globalStore.__demoBenefits!.map((benefit) => ({ ...benefit }))
}

export function findBenefit(id: string): Benefit | undefined {
  const benefit = globalStore.__demoBenefits!.find((item) => item.id === id)
  return benefit ? { ...benefit } : undefined
}

export function setBenefitActive(id: string, active: boolean): Benefit | undefined {
  const benefit = globalStore.__demoBenefits!.find((item) => item.id === id)
  if (!benefit) return undefined

  benefit.active = active
  return { ...benefit }
}