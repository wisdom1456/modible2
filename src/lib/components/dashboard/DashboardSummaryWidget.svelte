<script lang="ts">
  import type { FinancialSummary } from '$lib/types';

  export let financialSummary: FinancialSummary;

  // Ensure financialSummary is properly typed
  $: if (financialSummary) {
    const { balance, expenses, incomes, investments, goals } = financialSummary;
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Dashboard Summary</h2>
  <div class="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <h3 class="text-lg font-medium text-gray-700">Balance</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.balance}</p>
  </div>
  <div class="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Expenses</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.expenses.reduce((sum, expense) => sum + expense.amount, 0)}</p>
  </div>
  <div class="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Income</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.incomes.reduce((sum, income) => sum + income.amount, 0)}</p>
  </div>
  <div class="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Investments</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.investments.reduce((sum, investment) => sum + investment.value, 0)}</p>
  </div>
  <div class="bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
    <h3 class="text-lg font-medium text-gray-700">Total Goals</h3>
    <p class="text-xl font-bold text-gray-900">${financialSummary.goals.reduce((sum, goal) => sum + goal.targetAmount, 0)}</p>
  </div>
</div>