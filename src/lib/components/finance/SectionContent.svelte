<script lang="ts">
  import type { Writable } from 'svelte/store';
  import BudgetManager from './BudgetManager.svelte';
  import ExpenseTracker from './ExpenseTracker.svelte';
  import IncomeTracker from './IncomeTracker.svelte';
  import InvestmentOptimizer from './InvestmentOptimizer.svelte';
  import FinancialGoalPlanner from './FinancialGoalPlanner.svelte';
  import FinancialDashboard from './FinancialDashboard.svelte';
  import type { FinancialSummary } from '$lib/types';

  export let activeSection: Writable<string>;
  export let financialSummary: FinancialSummary | null;
</script>

<div class="section-content">
  {#if $activeSection === 'dashboard'}
    <FinancialDashboard financialSummary={financialSummary} />
  {:else if $activeSection === 'budget'}
    <BudgetManager />
  {:else if $activeSection === 'expenses'}
    <ExpenseTracker />
  {:else if $activeSection === 'income'}
    <IncomeTracker />
  {:else if $activeSection === 'investments'}
    <InvestmentOptimizer />
  {:else if $activeSection === 'goals'}
    <FinancialGoalPlanner />
  {/if}
</div>