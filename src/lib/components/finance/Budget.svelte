<script lang="ts">
  import { onMount } from 'svelte';
  import type { BudgetItem } from '$lib/types';
  import { budgetStore } from '$lib/stores/financeStore';
  import List from '$lib/components/common/List.svelte';
  import Spinner from '$lib/components/common/Spinner.svelte';
  import Error from '$lib/components/Error.svelte';
  import AddEditBudgetItemModal from './AddEditBudgetItemModal.svelte';

  let budgetItems: BudgetItem[] = [];
  let isLoading = false;
  let error: string | null = null;
  let showModal = false;
  let currentBudgetItem: BudgetItem | null = null;

  async function loadBudgetItems() {
    isLoading = true;
    error = null;
    try {
      budgetItems = await budgetStore.getBudgetItems();
    } catch (e) {
      error = e instanceof Error ? e.message : 'Failed to fetch budget items';
    } finally {
      isLoading = false;
    }
  }

  function handleAdd() {
    currentBudgetItem = null;
    showModal = true;
  }

  function handleEdit(budgetItem: BudgetItem) {
    currentBudgetItem = budgetItem;
    showModal = true;
  }

  function handleCloseModal() {
    showModal = false;
    loadBudgetItems();
  }

  onMount(loadBudgetItems);
</script>

<div class="p-4 bg-gray-900 rounded-lg shadow-md" role="region" aria-labelledby="budget-heading">
  <h2 id="budget-heading" class="text-2xl font-bold mb-4 text-white">Budget</h2>
  
  <button on:click={handleAdd} class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Add Budget Item</button>

  {#if isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if error}
    <Error message={error} />
  {:else}
    <List items={budgetItems} columns={[
      { key: 'name', label: 'Name' },
      { key: 'amount', label: 'Amount' },
      { key: 'category', label: 'Category' },
    ]} 
      onEdit={handleEdit}  
      />
  {/if}

  {#if showModal}
    <AddEditBudgetItemModal {currentBudgetItem} on:close={handleCloseModal} />
  {/if}
</div>