<script setup lang="ts">
import { useBenefitsViewModel } from '~/composables/benefits/useBenefitsViewModel';

const {
  search,
  showOnlyActive,
  selectedCategory,
  updatingIds,
  actionError,
  benefits,
  filteredBenefits,
  summary,
  status,
  error,
  refresh,
  toggleBenefit,
  clearFilters,
} = useBenefitsViewModel();

const categoryLabels = {
  meal: 'Refeição',
  food: 'Alimentação',
  transport: 'Transporte',
} as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
</script>

<template>
  <main class="page-shell">
    <header class="page-header">
      <div>
        <p class="eyebrow">Painel da empresa</p>
        <h1>Benefícios</h1>
        <p class="page-description">
          Consulte saldos e gerencie os benefícios disponibilizados.
        </p>
      </div>

      <button class="button button-secondary" type="button" @click="refresh()">
        <span aria-hidden="true">↻</span>
        Atualizar
      </button>
    </header>

    <BenefitSummary :summary="summary" />

    <section class="panel">
      <div class="panel-heading">
        <div>
          <h2>Todos os benefícios</h2>
          <p class="muted">Use os filtros para encontrar um benefício.</p>
        </div>
        <span class="count-pill">{{ filteredBenefits.length }} itens</span>
      </div>

      <div class="filters">
        <label class="search-field">
          <span class="sr-only">Buscar benefício</span>
          <span aria-hidden="true">⌕</span>
          <input
            v-model="search"
            type="search"
            placeholder="Buscar benefício..."
          />
        </label>

        <label class="select-field">
          <span class="sr-only">Categoria</span>
          <select v-model="selectedCategory">
            <option value="all">Todas as categorias</option>
            <option value="meal">Refeição</option>
            <option value="food">Alimentação</option>
            <option value="transport">Transporte</option>
          </select>
        </label>

        <label class="checkbox-field">
          <input v-model="showOnlyActive" type="checkbox" />
          Somente ativos
        </label>

        <button
          class="button button-ghost"
          type="button"
          @click="clearFilters()"
        >
          Limpar
        </button>
      </div>

      <p v-if="actionError" class="alert alert-error" role="alert">
        {{ actionError }}
      </p>

      <div
        v-if="status === 'pending' && benefits.length === 0"
        class="state-message"
      >
        Carregando benefícios...
      </div>

      <div v-else-if="error" class="state-message">
        <p>Não foi possível carregar os benefícios.</p>
        <button
          class="button button-secondary"
          type="button"
          @click="refresh()"
        >
          Tentar novamente
        </button>
      </div>

      <div v-else-if="filteredBenefits.length === 0" class="state-message">
        <strong>Nenhum benefício encontrado</strong>
        <p class="muted">Experimente alterar os filtros da busca.</p>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Benefício</th>
              <th>Categoria</th>
              <th>Saldo disponível</th>
              <th>Status</th>
              <th><span class="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="benefit in filteredBenefits" :key="benefit.id">
              <td>
                <div class="benefit-name">
                  <span class="benefit-icon" aria-hidden="true">
                    {{
                      benefit.category === 'transport'
                        ? '↗'
                        : benefit.category === 'food'
                          ? '◈'
                          : '◇'
                    }}
                  </span>
                  <strong>{{ benefit.name }}</strong>
                </div>
              </td>
              <td>{{ categoryLabels[benefit.category] }}</td>
              <td class="balance">{{ formatCurrency(benefit.balance) }}</td>
              <td>
                <span
                  class="status-pill"
                  :class="benefit.active ? 'status-active' : 'status-inactive'"
                >
                  <span class="status-dot" />
                  {{ benefit.active ? 'Ativo' : 'Inativo' }}
                </span>
              </td>
              <td class="action-cell">
                <button
                  class="button button-small"
                  :class="benefit.active ? 'button-ghost' : 'button-primary'"
                  type="button"
                  :disabled="updatingIds.includes(benefit.id)"
                  @click="toggleBenefit(benefit)"
                >
                  {{
                    updatingIds.includes(benefit.id)
                      ? 'Salvando...'
                      : benefit.active
                        ? 'Desativar'
                        : 'Ativar'
                  }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="panel-footer">
        <span>Dados demonstrativos</span>
        <span>API fake · Nuxt server</span>
      </footer>
    </section>

    <p class="architecture-note">
      <strong>Arquitetura:</strong> View (página e componentes) · ViewModel
      (composable) · Service (HTTP) · API fake (Nitro).
    </p>
  </main>
</template>
