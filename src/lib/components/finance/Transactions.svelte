<script lang="ts">
  import { onMount } from 'svelte';
  import { transactionsStore } from '$lib/stores/financeStore';
  import type { Transaction } from '$lib/types/finance';

  let transactions: Transaction[] = [];
  let newTransaction: Omit<Transaction, 'id'> = { date: new Date(), amount: 0, type: 'income', description: '' };
  let isLoading = false;
  let error: string | null = null;

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

  async function addTransaction() {
    if (!newTransaction.amount || !newTransaction.description) {
      error = 'Invalid transaction details';
      return;
    }
    isLoading = true;
    error = null;
    try {
      await transactionsStore.addTransaction(newTransaction);
      await loadTransactions();
      newTransaction = { date: new Date(), amount: 0, type: 'income', description: '' };
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to add transaction';
    } finally {
      isLoading = false;
    }
  }

  onMount(loadTransactions);
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="transactions-heading">
  <h2 id="transactions-heading" class="text-2xl font-bold mb-4 text-gray-800">Transactions</h2>
  
  {#if isLoading}
    <p class="text-gray-600">Loading transactions...</p>
  {:else if error}
    <p class="text-red-500" role="alert">Error: {error}</p>
  {:else}
    <ul class="space-y-2">
      {#each transactions as transaction (transaction.id)}
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span class="text-gray-800">{transaction.date.toLocaleDateString()}</span>
          <span class="text-gray-800">{transaction.description} - ${transaction.amount} ({transaction.type})</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addTransaction} class="mt-4 space-y-4" aria-label="Add new transaction">
      <input type="date" bind:value={newTransaction.date} required class="input" />
      <input type="number" bind:value={newTransaction.amount} placeholder="Amount" required class="input" />
      <select bind:value={newTransaction.type} required class="input">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input bind:value={newTransaction.description} placeholder="Description" required class="input" />
      <button type="submit" class="btn">Add Transaction</button>
    </form>
  {/if}
</div>