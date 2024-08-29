<script lang="ts">
  import { onMount } from 'svelte';
  import BudgetManager from './BudgetManager.svelte';
  import ExpenseTracker from './ExpenseTracker.svelte';
  import IncomeTracker from './IncomeTracker.svelte';
  import InvestmentOptimizer from './InvestmentOptimizer.svelte';
  import FinancialGoalPlanner from './FinancialGoalPlanner.svelte';
  import FinancialDashboard from './FinancialDashboard.svelte';
  import FinancialInsights from './FinancialInsights.svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import { writable } from 'svelte/store';

  let activeSection = writable('dashboard');
  let financialSummary;
  let transactions = writable([]);
  let transactionsTitle = writable('Transactions');

  onMount(async () => {
    financialSummary = await financeStore.getFinancialSummary();
    updateTransactions('dashboard');
  });

  function changeSection(section: string) {
    activeSection.set(section);
    updateTransactions(section);
  }

  async function updateTransactions(section: string) {
    let data;
    switch (section) {
      case 'budget':
        data = await financeStore.getBudget();
        transactions.set(data.categories);
        transactionsTitle.set('Budget');
        break;
      case 'expenses':
        data = await financeStore.getExpenses();
        transactions.set(data);
        transactionsTitle.set('Expenses');
        break;
      case 'income':
        data = await financeStore.getIncomes();
        transactions.set(data);
        transactionsTitle.set('Income');
        break;
      case 'investments':
        data = await financeStore.getInvestments();
        transactions.set(data);
        transactionsTitle.set('Investments');
        break;
      case 'goals':
        data = await financeStore.getFinancialGoals();
        transactions.set(data);
        transactionsTitle.set('Goals');
        break;
      default:
        transactions.set([]);
        transactionsTitle.set('Transactions');
    }
  }
</script>

<div class="financial-planner p-6 bg-gray-100 min-h-screen">
  
  <div class="summary-section mb-6 p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">Financial Summary</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="summary-item p-4 bg-gray-100 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-700">Balance</h3>
        <p class="text-xl font-bold text-gray-900">${financialSummary?.balance || 0}</p>
      </div>
      <div class="summary-item p-4 bg-gray-100 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-700">Expenses</h3>
        <p class="text-xl font-bold text-gray-900">${financialSummary?.expenses.reduce((sum, expense) => sum + expense.amount, 0) || 0}</p>
      </div>
      <div class="summary-item p-4 bg-gray-100 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-700">Income</h3>
        <p class="text-xl font-bold text-gray-900">${financialSummary?.incomes.reduce((sum, income) => sum + income.amount, 0) || 0}</p>
      </div>
    </div>
  </div>
   <nav class="finance-nav mb-6 flex space-x-4">
        <button class:active={$activeSection === 'dashboard'} on:click={() => changeSection('dashboard')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Dashboard</button>
        <button class:active={$activeSection === 'budget'} on:click={() => changeSection('budget')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Budget</button>
        <button class:active={$activeSection === 'expenses'} on:click={() => changeSection('expenses')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Expenses</button>
        <button class:active={$activeSection === 'income'} on:click={() => changeSection('income')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Income</button>
        <button class:active={$activeSection === 'investments'} on:click={() => changeSection('investments')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Investments</button>
        <button class:active={$activeSection === 'goals'} on:click={() => changeSection('goals')} class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Goals</button>
      </nav>

      <div class="finance-content">
        {#if $activeSection === 'dashboard'}
          <div class="card bg-white p-6 rounded-lg shadow-md">
            <FinancialDashboard />
          </div>
        {:else if $activeSection === 'budget'}
          <div class="card bg-white p-6 rounded-lg shadow-md">
            <BudgetManager />
          </div>
        {:else if $activeSection === 'expenses'}
          <div class="card bg-white p-6 rounded-lg shadow-md">
            <ExpenseTracker />
          </div>
        {:else if $activeSection === 'income'}
          <div class="card bg-white p-6 rounded-lg shadow-md">
            <IncomeTracker />
          </div>
        {:else if $activeSection === 'investments'}
          <div class="card bg-white p-6 rounded-lg shadow-md">
            <InvestmentOptimizer />
          </div>
        {:else if $activeSection === 'goals'}
          <div class="card bg-white p-6 rounded-lg shadow-md">
            <FinancialGoalPlanner />
          </div>
        {/if}
      </div>

    <div class="transactions mt-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">{$transactionsTitle}</h2>
      <ul class="list-none p-0">
        {#each $transactions as transaction}
          <li class="p-4 bg-white rounded-lg shadow-sm mb-4 flex justify-between">
            {#if $activeSection === 'budget'}
              <span class="text-lg font-medium text-gray-700">{transaction.name}</span>
              <span class="text-lg font-medium text-gray-700">${transaction.amount}</span>
            {:else if $activeSection === 'expenses'}
              <span class="text-lg font-medium text-gray-700">{transaction.description}</span>
              <span class="text-lg font-medium text-gray-700">${transaction.amount}</span>
            {:else if $activeSection === 'income'}
              <span class="text-lg font-medium text-gray-700">{transaction.source}</span>
              <span class="text-lg font-medium text-gray-700">${transaction.amount}</span>
            {:else if $activeSection === 'investments'}
              <span class="text-lg font-medium text-gray-700">{transaction.name}</span>
              <span class="text-lg font-medium text-gray-700">${transaction.amount}</span>
            {:else if $activeSection === 'goals'}
              <span class="text-lg font-medium text-gray-700">{transaction.name}</span>
              <span class="text-lg font-medium text-gray-700">${transaction.amount}</span>
            {/if}
          </li>
        {/each}
      </ul>
    </div>
</div>

<style>
  .finance-nav button.active {
    background-color: #2563eb; /* Tailwind's blue-600 */
  }
  .finance-nav button {
    transition: background-color 0.3s;
  }
</style>