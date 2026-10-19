<script setup lang="ts">
import type { BenefitSummary } from '~/types/benefits'

defineProps<{
  summary: BenefitSummary
}>()

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<template>
  <section class="summary-grid" aria-label="Resumo dos benefícios">
    <article class="summary-card">
      <span class="eyebrow">Saldo total</span>
      <strong class="summary-value">{{ formatCurrency(summary.totalBalance) }}</strong>
    </article>

    <article class="summary-card">
      <span class="eyebrow">Benefícios ativos</span>
      <strong class="summary-value">{{ summary.activeBenefits }}</strong>
    </article>

    <article class="summary-card">
      <span class="eyebrow">Total de benefícios</span>
      <strong class="summary-value">{{ summary.totalBenefits }}</strong>
    </article>
  </section>
</template>