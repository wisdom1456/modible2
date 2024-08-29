<script lang="ts">
  import { onMount } from 'svelte';
  import type { BudgetItem } from '$lib/types';

  export let item: BudgetItem;

  let formattedAmount: string;

  onMount(() => {
    formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(item.amount);
  });
</script>

<div class="budget-item">
  <h3>{item.name}</h3>
  <p>{formattedAmount}</p>
</div>

<style>
  .budget-item {
    @apply p-4 border rounded-lg shadow-sm;
  }
</style>