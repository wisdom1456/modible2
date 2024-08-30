<script lang="ts">
  import { onMount } from 'svelte';
  import type { Income } from '$lib/types/finance';
  import { formatCurrency } from '$lib/utils/formatters';
  import Error from '$lib/components/common/Error.svelte';
  import { fetchIncomes, addIncome as addIncomeService } from '$lib/services/incomeService';
  import Spinner from '$lib/components/common/Spinner.svelte';

  let incomes: Income[] = [];
  let newIncome: Omit<Income, 'id'> = { date: new Date(), amount: 0, source: '', description: '' };
  let isLoading = false;
  let error: string | null = null;
  let currentPage = 1;
  let totalPages = 1;
  const ITEMS_PER_PAGE = 10;

  async function loadIncomes(page: number = currentPage) {
    isLoading = true;
    error = null;
    try {
      const result = await fetchIncomes(page, ITEMS_PER_PAGE);
      incomes = result.incomes;
      totalPages = result.totalPages;
      currentPage = page;
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch incomes';
    } finally {
      isLoading = false;
    }
  }

  function validateForm(): boolean {
    if (newIncome.amount <= 0) {
      error = 'Amount must be greater than 0';
      return false;
    }
    if (newIncome.source.trim() === '') {
      error = 'Source is required';
      return false;
    }
    return true;
  }

  function resetForm() {
    newIncome = { date: new Date(), amount: 0, source: '', description: '' };
    error = null;
  }

  async function addIncome() {
    if (!validateForm()) return;
    
    isLoading = true;
    error = null;
    try {
      await addIncomeService(newIncome);
      await loadIncomes();
      resetForm();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to add income';
    } finally {
      isLoading = false;
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      loadIncomes(currentPage + 1);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      loadIncomes(currentPage - 1);
    }
  }

  onMount(loadIncomes);
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="income-heading">
  <h2 id="income-heading" class="text-2xl font-bold mb-4 text-gray-800">Income</h2>
  
  {#if isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if error}
    <Error message={error} />
  {:else}
    <ul class="space-y-2" aria-label="Income entries">
      {#each incomes as income (income.id)} <!-- Assuming each income has a unique id -->
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span class="text-gray-800">{income.date.toLocaleDateString()}</span>
          <span class="text-gray-800">{income.description} - {formatCurrency(income.amount)} ({income.source})</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addIncome} class="mt-4 space-y-4" aria-labelledby="add-income-heading">
      <h3 id="add-income-heading" class="sr-only">Add new income</h3>
      <label class="block">
        <span class="text-gray-700">Date</span>
        <input type="date" bind:value={newIncome.date} required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Amount</span>
        <input type="number" bind:value={newIncome.amount} placeholder="Amount" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Source</span>
        <input bind:value={newIncome.source} placeholder="Source" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Description</span>
        <input bind:value={newIncome.description} placeholder="Description" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Add Income
      </button>
    </form>
  {/if}
</div>

<div class="flex justify-between mt-4">
  <button
    class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    on:click={prevPage}
    disabled={currentPage === 1}
  >
    Previous
  </button>
  <span>Page {currentPage} of {totalPages}</span>
  <button
    class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    on:click={nextPage}
    disabled={currentPage === totalPages}
  >
    Next
  </button>
</div>