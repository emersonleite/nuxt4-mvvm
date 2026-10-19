import type { Benefit } from '~/types/benefits'

export function getBenefits() {
  return $fetch<Benefit[]>('/api/benefits')
}

export function updateBenefitStatus(id: string, active: boolean) {
  return $fetch<Benefit>(`/api/benefits/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: { active },
  })
}