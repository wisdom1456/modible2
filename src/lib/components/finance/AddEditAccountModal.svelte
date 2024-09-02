<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { accountsStore } from '$lib/stores/financeStore';
  import type { Account } from '$lib/types/finance';

  export let currentAccount: Account | null = null;
  const dispatch = createEventDispatcher();

  let account: Omit<Account, 'id'> = currentAccount ? { ...currentAccount } : { name: '', balance: 0 };
  let isLoading = false;
  let error: string | null = null;

  async function handleSubmit() {
    isLoading = true;
    error = null;
    try {
      if (currentAccount) {
        await accountsStore.updateAccount({ ...account, id: currentAccount.id });
      } else {
        await accountsStore.addAccount(account);
      }
      dispatch('close');
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to save account';
    } finally {
      isLoading = false;
    }
  }

  async function handleDelete() {
    if (currentAccount) {
      isLoading = true;
      error = null;
      try {
        await accountsStore.deleteAccount(currentAccount.id);
        dispatch('close');
      } catch (e) {
        error = e instanceof Error ? e.message : 'Failed to delete account';
      } finally {
        isLoading = false;
      }
    }
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">{currentAccount ? 'Edit Account' : 'Add Account'}</h2>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <label class="block">
        <span class="text-gray-700">Name</span>
        <input bind:value={account.name} placeholder="Name" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <label class="block">
        <span class="text-gray-700">Balance</span>
        <input type="number" bind:value={account.balance} placeholder="Balance" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </label>
      <div class="flex justify-end space-x-4">
        {#if currentAccount}
          <button type="button" on:click={handleDelete} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
        {/if}
        <button type="submit" class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">{currentAccount ? 'Save' : 'Add'}</button>
        <button type="button" on:click={() => dispatch('close')} class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
      </div>
    </form>
  </div>
</div>