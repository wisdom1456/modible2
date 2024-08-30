<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { FinancialInsight } from '$lib/types';

  let insights: FinancialInsight[] = [];

  onMount(async () => {
    insights = await financeStore.getFinancialInsights();
  });
</script>

<div>
  <h2 class="text-2xl font-bold mb-4">Financial Insights</h2>
  <ul class="space-y-2">
    {#each insights as insight}
      <li class="bg-white p-4 rounded-lg shadow">
        <strong class="text-lg">{insight.description}</strong>: {insight.value}
      </li>
    {/each}
  </ul>
</div>