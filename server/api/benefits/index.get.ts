import { listBenefits } from '../../utils/benefits-store'

export default defineEventHandler(() => {
  return listBenefits()
})