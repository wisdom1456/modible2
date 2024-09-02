<script lang="ts">
  import { onMount } from 'svelte';
  import { accountsStore } from '$lib/stores/financeStore';
  import type { Account } from '$lib/types/finance';

  let accounts: Account[] = [];
  let newAccount: Omit<Account, 'id'> = { name: '', balance: 0 };
  let isLoading = false;
  let error: string | null = null;

  async function loadAccounts() {
    isLoading = true;
    error = null;
    try {
      accounts = await accountsStore.getAccounts();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch accounts';
    } finally {
      isLoading = false;
    }
  }

  async function addAccount() {
    if (!newAccount.name || newAccount.balance < 0) {
      error = 'Invalid account details';
      return;
    }
    isLoading = true;
    error = null;
    try {
      await accountsStore.addAccount(newAccount);
      await loadAccounts();
      newAccount = { name: '', balance: 0 };
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to add account';
    } finally {
      isLoading = false;
    }
  }

  onMount(loadAccounts);
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="accounts-heading">
  <h2 id="accounts-heading" class="text-2xl font-bold mb-4 text-gray-800">Accounts</h2>
  
  {#if isLoading}
    <p class="text-gray-600">Loading accounts...</p>
  {:else if error}
    <p class="text-red-500" role="alert">Error: {error}</p>
  {:else}
    <ul class="space-y-2">
      {#each accounts as account (account.id)}
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span class="text-gray-800">{account.name}</span>
          <span class="text-gray-800">${account.balance}</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addAccount} class="mt-4 space-y-4" aria-label="Add new account">
      <input bind:value={newAccount.name} placeholder="Account Name" required class="input" />
      <input type="number" bind:value={newAccount.balance} placeholder="Balance" required class="input" />
      <button type="submit" class="btn">Add Account</button>
    </form>
  {/if}
</div>