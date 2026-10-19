import { setBenefitActive } from '../../utils/benefits-store'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID do benefício é obrigatório.',
    })
  }

  const body = await readBody<{ active?: unknown }>(event)

  if (typeof body?.active !== 'boolean') {
    throw createError({
      statusCode: 400,
      statusMessage: 'O campo "active" deve ser booleano.',
    })
  }

  const updatedBenefit = setBenefitActive(id, body.active)

  if (!updatedBenefit) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Benefício não encontrado.',
    })
  }

  return updatedBenefit
})