<script lang="ts">
  import { onMount } from 'svelte';
  import type { Account } from '$lib/types/finance';
  import { accountsStore } from '$lib/stores/financeStore';
  import List from '$lib/components/common/List.svelte';
  import Spinner from '$lib/components/common/Spinner.svelte';
  import Error from '$lib/components/Error.svelte';
  import AddEditAccountModal from './AddEditAccountModal.svelte';

  let accounts: Account[] = [];
  let isLoading = false;
  let error: string | null = null;
  let showModal = false;
  let currentAccount: Account | null = null;

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

  function handleAdd() {
    currentAccount = null;
    showModal = true;
  }

  function handleEdit(account: Account) {
    currentAccount = account;
    showModal = true;
  }

  function handleCloseModal() {
    showModal = false;
    loadAccounts();
  }

  onMount(loadAccounts);
</script>

<div class="p-4 bg-gray-900 rounded-lg shadow-md" role="region" aria-labelledby="accounts-heading">
  <h2 id="accounts-heading" class="text-2xl font-bold mb-4 text-white">Accounts</h2>
  
  <button on:click={handleAdd} class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add Account</button>

  {#if isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if error}
    <Error message={error} />
  {:else}
    <List items={accounts} columns={[
      { key: 'name', label: 'Name' },
      { key: 'balance', label: 'Balance' }
    ]}
      onEdit={handleEdit}  
      />
  {/if}

  {#if showModal}
    <AddEditAccountModal {currentAccount} on:close={handleCloseModal} />
  {/if}
</div>