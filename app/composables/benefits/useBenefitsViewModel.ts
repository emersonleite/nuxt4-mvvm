import { computed, ref } from 'vue';
import {
  getBenefits,
  updateBenefitStatus,
} from '~/services/benefits/benefits.service';
import type { Benefit, BenefitCategory } from '~/types/benefits';

type CategoryFilter = 'all' | BenefitCategory;

export function useBenefitsViewModel() {
  const search = ref('');
  const showOnlyActive = ref(false);
  const selectedCategory = ref<CategoryFilter>('all');
  const updatingIds = ref<string[]>([]);
  const actionError = ref<string | null>(null);

  const { data, status, error, refresh } = useAsyncData<Benefit[]>(
    'benefits-list',
    getBenefits,
    { default: () => [] },
  );

  const benefits = computed(() => data.value ?? []);

  const filteredBenefits = computed(() => {
    const normalizedSearch = search.value.trim().toLocaleLowerCase('pt-BR');

    return benefits.value.filter((benefit) => {
      const matchesSearch = benefit.name
        .toLocaleLowerCase('pt-BR')
        .includes(normalizedSearch);

      const matchesStatus = !showOnlyActive.value || benefit.active;
      const matchesCategory =
        selectedCategory.value === 'all' ||
        benefit.category === selectedCategory.value;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  });

  const summary = computed(() => ({
    totalBalance: benefits.value.reduce(
      (total, benefit) => total + benefit.balance,
      0,
    ),
    activeBenefits: benefits.value.filter((benefit) => benefit.active).length,
    totalBenefits: benefits.value.length,
  }));

  async function toggleBenefit(benefit: Benefit) {
    if (updatingIds.value.includes(benefit.id)) return;

    actionError.value = null;
    updatingIds.value = [...updatingIds.value, benefit.id];

    try {
      const updatedBenefit = await updateBenefitStatus(
        benefit.id,
        !benefit.active,
      );
      data.value = benefits.value.map((item) =>
        item.id === updatedBenefit.id ? updatedBenefit : item,
      );
    } catch {
      actionError.value = `Não foi possível atualizar "${benefit.name}". Tente novamente.`;
    } finally {
      updatingIds.value = updatingIds.value.filter((id) => id !== benefit.id);
    }
  }

  function clearFilters() {
    search.value = '';
    showOnlyActive.value = false;
    selectedCategory.value = 'all';
  }

  return {
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
  };
}
