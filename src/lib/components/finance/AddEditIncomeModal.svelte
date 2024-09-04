<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types/finance';

  export let currentIncome: Transaction | null = null;
  const dispatch = createEventDispatcher();

  let description = currentIncome?.description || '';
  let amount = currentIncome?.amount || 0;
  let date = currentIncome?.date || new Date().toISOString().split('T')[0];
  let name = currentIncome?.name || '';
  let category = currentIncome?.category || '';
  let type = currentIncome?.type || 'income';

  function handleSave() {
    const newIncome: Transaction = {
      id: currentIncome ? currentIncome.id : Date.now().toString(),
      description,
      category,
      amount,
      date: new Date(date),
      type: 'income',
      name    
    };

    if (currentIncome) {
      transactionsStore.updateTransaction(newIncome);
    } else {
      transactionsStore.addTransaction(newIncome);
    }

    dispatch('close');
  }

  function handleCancel() {
    dispatch('close');
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-xl font-bold mb-4">{currentIncome ? 'Edit Income' : 'Add Income'}</h2>
    <form on:submit|preventDefault={handleSave}>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Description</label>
        <input type="text" bind:value={description} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Amount</label>
        <input type="number" bind:value={amount} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" bind:value={date} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Source</label>
        <input type="text" bind:value={name} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="flex justify-end">
        <button type="button" on:click={handleCancel} class="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cancel</button>
        <button type="submit" class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
      </div>
    </form>
  </div>
</div>
