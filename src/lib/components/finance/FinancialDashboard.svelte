<script lang="ts">
  import type { FinancialSummary } from '$lib/types';

  export let financialSummary: FinancialSummary | null;
</script>

{#if financialSummary}
  <!-- Display financial summary -->
  <p>Total Balance: ${financialSummary.totalBalance}</p>
  <p>Monthly Income: ${financialSummary.monthlyIncome}</p>
  <p>Monthly Expenses: ${financialSummary.monthlyExpenses}</p>
{:else}
  <p>Loading financial summary...</p>
{/if}