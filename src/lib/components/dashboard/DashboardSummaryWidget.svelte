<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';

  let financialSummary = {
    balance: 0,
    expenses: [],
    incomes: [],
    investments: [],
    goals: []
  };

  onMount(async () => {
    financialSummary = await financeStore.getFinancialSummary();
  });
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Dashboard Summary</h2>
  <div class="summary-item mb-4">
    <h3 class="text-lg font-medium text-gray-700">Balance</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.balance}</p>
  </div>
  <div class="summary-item mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Expenses</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.expenses.reduce((sum, expense) => sum + expense.amount, 0)}</p>
  </div>
  <div class="summary-item mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Income</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.incomes.reduce((sum, income) => sum + income.amount, 0)}</p>
  </div>
  <div class="summary-item mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Investments</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.investments.reduce((sum, investment) => sum + investment.amount, 0)}</p>
  </div>
  <div class="summary-item mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Goals</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.goals.reduce((sum, goal) => sum + goal.amount, 0)}</p>
  </div>
</div>

<style>
  .summary-item {
    background: #f3f4f6; /* Tailwind's gray-100 */
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
</style>