<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { budgetStore } from '$lib/stores/financeStore';
  import type { BudgetItem } from '$lib/types/finance';

  export let currentBudgetItem: BudgetItem | null = null;
  const dispatch = createEventDispatcher();

  let budgetItem: Omit<BudgetItem, 'id'> = currentBudgetItem ? { ...currentBudgetItem } : { name: '', amount: 0, category: '' };
  let isLoading = false;
  let error: string | null = null;

  async function handleSubmit() {
    isLoading = true;
    error = null;
    try {
      if (currentBudgetItem) {
        await budgetStore.updateBudgetItem({ ...budgetItem, id: currentBudgetItem.id });
      } else {
        await budgetStore.addBudgetItem(budgetItem);
      }
      dispatch('close');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to save budget item';
    } finally {
      isLoading = false;
    }
  }

  async function handleDelete() {
    if (currentBudgetItem) {
      isLoading = true;
      error = null;
      try {
        await budgetStore.deleteBudgetItem(currentBudgetItem.id);
        dispatch('close');
      } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to delete budget item';
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
  <div class="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">{currentBudgetItem ? 'Edit Budget Item' : 'Add Budget Item'}</h2>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <label class="block">
        <span class="text-gray-700">Name</span>
        <input bind:value={budgetItem.name} placeholder="Name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Amount</span>
        <input type="number" bind:value={budgetItem.amount} placeholder="Amount" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Category</span>
        <div class="relative mt-2">
          <input id="combobox" type="text" bind:value={budgetItem.category} class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false">
          <button type="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
            </svg>
          </button>
          <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox">
            <!-- Options will be dynamically generated here -->
          </ul>
        </div>
      </label>
      <div class="flex justify-end space-x-4">
        {#if currentBudgetItem}
          <button type="button" on:click={handleDelete} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
        {/if}
        <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{currentBudgetItem ? 'Save' : 'Add'}</button>
        <button type="button" on:click={() => dispatch('close')} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
      </div>
    </form>
  </div>
</div>