<script lang="ts">
  import { onMount } from 'svelte';
  import type { FinancialSummary, Transaction } from '$lib/types/finance';
  import { transactionsStore } from '$lib/stores/financeStore';
  import FinancialDashboard from './FinancialDashboard.svelte';
  import Spinner from '../common/Spinner.svelte';
  import Error from '../common/Error.svelte';
  
  let financialSummary: FinancialSummary | null = null;
  let isLoading = false;
  let error: string | null = null;

  async function loadFinancialSummary() {
    isLoading = true;
    error = null;
    try {
      const transactions = await transactionsStore.getTransactions();
      const incomeTransactions = transactions.filter((transaction: Transaction) => transaction.type === 'income');
      const expenseTransactions = transactions.filter((transaction: Transaction) => transaction.type === 'expense');

      financialSummary = {
        balance: incomeTransactions.reduce((sum, t) => sum + t.amount, 0) - expenseTransactions.reduce((sum, t) => sum + t.amount, 0),
        monthlyIncome: incomeTransactions.reduce((sum, t) => sum + t.amount, 0),
        monthlyExpenses: expenseTransactions.reduce((sum, t) => sum + t.amount, 0),
        totalBalance: incomeTransactions.reduce((sum, t) => sum + t.amount, 0) - expenseTransactions.reduce((sum, t) => sum + t.amount, 0),
        transactions,
        investments: [], // Assuming default empty array for investments
        goals: [], // Assuming default empty array for goals
        categories: [], // Assuming default empty array for categories
        dailyExpenses: [], // Assuming default empty array for daily expenses
        insights: [] // Assuming default empty array for insights
      };
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch financial summary';
    } finally {
      isLoading = false;
    }
  }

  onMount(loadFinancialSummary);
</script>

<div class="p-4 bg-gray-900 rounded-lg shadow-md" role="region" aria-labelledby="overview-heading">
  <h2 id="overview-heading" class="text-2xl font-bold mb-4 text-white">Overview</h2>

  {#if isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if error}
    <Error message={error} />
  {:else if financialSummary}
    <FinancialDashboard {financialSummary} />
  {/if}
</div>
