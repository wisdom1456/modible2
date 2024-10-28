<!-- src/lib/components/finance/AddEditTransactionModal.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types';

  export let currentTransaction: Transaction | null = null;
  const dispatch = createEventDispatcher();

  let description: string;
  let amount: number;
  let date: string;
  let type: Transaction['type'];
  let category: string;
  let name: string;

  onMount(() => {
    console.log('Modal mounted with transaction:', currentTransaction); // Debug log
    initializeFormData();
  });

  function initializeFormData() {
    if (currentTransaction) {
      description = currentTransaction.description;
      amount = currentTransaction.amount;
      date = new Date(currentTransaction.date).toISOString().split('T')[0];
      type = currentTransaction.type;
      category = currentTransaction.category;
      name = currentTransaction.name;
      console.log('Initialized form with:', { description, amount, date, type, category, name }); // Debug log
    } else {
      description = '';
      amount = 0;
      date = new Date().toISOString().split('T')[0];
      type = 'income';
      category = '';
      name = '';
      console.log('Transaction constructor with:', { description, amount, date, type, category, name }); // Debug log
    
    }
  }

  function handleSave() {
    const newTransaction: Transaction = {
      id: currentTransaction ? currentTransaction.id : Date.now().toString(),
      description,
      name,
      amount,
      date: new Date(date),
      type,
      category,
    };

    if (currentTransaction) {
      transactionsStore.updateTransaction(newTransaction);
    } else {
      transactionsStore.addTransaction(newTransaction);
    }

    dispatch('close');
  }

  function handleCancel() {
    dispatch('close');
  }
</script>

<!-- Modal Content -->
<div
  class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
  role="dialog"
  aria-modal="true"
>
  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
    <h2 class="text-xl font-bold mb-4">
      {currentTransaction ? 'Edit Transaction' : 'Add Transaction'}
    </h2>
    <form on:submit|preventDefault={handleSave}>
      <!-- Description Field -->
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          id="description"
          type="text"
          bind:value={description}
          class="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Amount Field -->
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input
          id="amount"
          type="number"
          bind:value={amount}
          step="0.01"
          class="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Date Field -->
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input
          id="date"
          type="date"
          bind:value={date}
          class="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Type Field -->
      <div class="mb-4">
        <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
        <select
          id="type"
          bind:value={type}
          class="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <!-- Category Field -->
      <div class="mb-4">
        <label for="category" class="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          type="text"
          bind:value={category}
          class="mt-1 block w-full rounded-md border-gray-300 text-gray-700 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <!-- Buttons -->
      <div class="flex justify-end">
        <button
          type="button"
          on:click={handleCancel}
          class="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</div>
