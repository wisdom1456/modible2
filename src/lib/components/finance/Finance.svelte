<script lang="ts">
    import FinancialPlanner from './FinancialPlanner.svelte';
    import BudgetManager from './BudgetManager.svelte';
    import ExpenseTracker from './ExpenseTracker.svelte';
    import InvestmentOptimizer from './InvestmentOptimizer.svelte';
    import FinancialGoalPlanner from './FinancialGoalPlanner.svelte';
</script>

<div class="finance-container p-6 bg-gray-100 min-h-screen">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Financial Planner</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FinancialPlanner />
    </div>
</div>