<script lang="ts">
  export let financialSummary: {
    monthlyExpenses: number;
    budget: { categories: any[] };
    expenses: any[];
    incomes: any[];
    investments: any[];
    investmentRecommendations: any[];
  };
</script>

<div>
  <p class="text-lg text-gray-600">Monthly Expenses: <span class="text-blue-600">${financialSummary.monthlyExpenses}</span></p>
  <!-- Add more financial summary details -->
</div>