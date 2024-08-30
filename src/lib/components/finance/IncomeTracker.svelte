<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { Income } from '$lib/types';

  let incomes: Income[] = [];
  let newIncome: Income = { id: '', date: new Date(), amount: 0, source: '', description: '' };
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      incomes = await financeStore.getIncomes();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });

  async function addIncome() {
    try {
      await financeStore.addIncome(newIncome);
      newIncome = { id: '', date: new Date(), amount: 0, source: '', description: '' };
      incomes = await financeStore.getIncomes();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    }
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Income Tracker</h2>
  <ul class="space-y-2">
    {#each incomes as income}
      <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
        <span>{income.date.toLocaleDateString()}</span>
        <span>{income.description} - ${income.amount} ({income.source})</span>
      </li>
    {/each}
  </ul>
  <form on:submit|preventDefault={addIncome} class="mt-4 space-y-4">
    <input type="date" bind:value={newIncome.date} required class="w-full p-2 border border-gray-300 rounded-md" />
    <input type="number" bind:value={newIncome.amount} placeholder="Amount" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input bind:value={newIncome.source} placeholder="Source" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input bind:value={newIncome.description} placeholder="Description" required class="w-full p-2 border border-gray-300 rounded-md" />
    <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Income</button>
  </form>
</div>