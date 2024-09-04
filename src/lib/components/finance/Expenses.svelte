<script lang="ts">
  import { onMount } from 'svelte';
  import type { Transaction } from '$lib/types/finance';
  import { transactionsStore } from '$lib/stores/financeStore';
  import List from '$lib/components/common/List.svelte';
  import Spinner from '$lib/components/common/Spinner.svelte';
  import Error from '$lib/components/Error.svelte';
  import AddEditTransactionModal from './AddEditTransactionModal.svelte';

  let transactions: Transaction[] = [];
  let isLoading = false;
  let error: string | null = null;
  let showModal = false;
  let currentTransaction: Transaction | null = null;

  async function loadTransactions() {
    isLoading = true;
    error = null;
    try {
      transactions = await transactionsStore.getTransactions();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch transactions';
    } finally {
      isLoading = false;
    }
  }

  function handleAdd() {
    currentTransaction = null;
    showModal = true;
  }

  function handleEdit(transaction: Transaction) {
    currentTransaction = transaction;
    showModal = true;
  }

  function handleCloseModal() {
    showModal = false;
    loadTransactions();
  }

  onMount(loadTransactions);
</script>

<div class="p-4 bg-gray-900 rounded-lg shadow-md" role="region" aria-labelledby="transactions-heading">
  <h2 id="transactions-heading" class="text-2xl font-bold mb-4 text-white">Transactions</h2>
  
  <button on:click={handleAdd} class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add Transaction</button>

  {#if isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if error}
    <Error message={error} />
  {:else}
    <List items={transactions} columns={[
      { key: 'date', label: 'Date' },
      { key: 'amount', label: 'Amount' },
      { key: 'type', label: 'Type' },
      { key: 'category', label: 'Category' },
      { key: 'description', label: 'Description' }
    ]} onEdit={handleEdit} />
  {/if}

  {#if showModal}
    <AddEditTransactionModal {currentTransaction} on:close={handleCloseModal} />
  {/if}
</div>