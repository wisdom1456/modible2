<script lang="ts">
  import type { BudgetCategory, Expense, Income, Investment, InvestmentRecommendation } from '$lib/types';

  export let financialSummary: {
    monthlyExpenses: number;
    budget: { categories: BudgetCategory[] };
    expenses: Expense[];
    incomes: Income[];
    investments: Investment[];
    investmentRecommendations: InvestmentRecommendation[];
  };
</script>

<div>
  <p class="text-lg text-gray-600">Monthly Expenses: <span class="text-blue-600">${financialSummary.monthlyExpenses}</span></p>
  <!-- Add more financial summary details -->
</div>