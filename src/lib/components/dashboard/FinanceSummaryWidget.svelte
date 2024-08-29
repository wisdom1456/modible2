<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import FinancialSummaryDetails from './FinancialSummaryDetails.svelte';

  let financialSummary = {
    monthlyExpenses: 0,
    budget: { categories: [] },
    expenses: [],
    incomes: [],
    investments: [],
    investmentRecommendations: []
  };

  onMount(async () => {
    financialSummary = await financeStore.getFinancialSummary();
  });
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Financial Summary</h2>
  <FinancialSummaryDetails {financialSummary} />
</div>