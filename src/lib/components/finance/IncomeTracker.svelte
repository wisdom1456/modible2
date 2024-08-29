<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { Income } from '$lib/types';

  let incomes: Income[] = [];
  let newIncome: Income = { id: '', date: new Date(), amount: 0, source: '', description: '' };

  onMount(async () => {
    incomes = await financeStore.getIncomes();
  });

  function addIncome() {
    financeStore.addIncome(newIncome);
    newIncome = { id: '', date: new Date(), amount: 0, source: '', description: '' };
  }

  function deleteIncome(id: string) {
    financeStore.deleteIncome(id);
  }
</script>

<div class="card">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Income Tracker</h2>
  <div class="incomes space-y-4">
    {#each incomes as income}
      <div class="income-item flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
        <span class="text-lg font-medium text-gray-700">{income.source}</span>
        <span class="text-lg font-medium text-gray-700">${income.amount}</span>
        <button on:click={() => deleteIncome(income.id)} class="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    {/each}
  </div>
  <div class="form-group mt-4">
    <label for="source" class="block text-sm font-medium text-gray-700">Source</label>
    <input id="source" type="text" bind:value={newIncome.source} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <div class="form-group mt-4">
    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
    <input id="amount" type="number" bind:value={newIncome.amount} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <button on:click={addIncome} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Income</button>
</div>

<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>