<script lang="ts">
  import { onMount } from "svelte";
  import type { Income } from "$lib/types/finance";
  import { incomesStore } from "$lib/stores/financeStore";
  import List from "$lib/components/common/List.svelte";
  import Spinner from "$lib/components/common/Spinner.svelte";
  import Error from "$lib/components/Error.svelte";
  import AddEditIncomeModal from "./AddEditIncomeModal.svelte";

  let incomes: Income[] = [];
  let isLoading = false;
  let error: string | null = null;
  let showModal = false;
  let currentIncome: Income | null = null;

  async function loadIncomes() {
    isLoading = true;
    error = null;
    try {
      incomes = await incomesStore.getIncomes();
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to fetch incomes";
    } finally {
      isLoading = false;
    }
  }

  function handleAdd() {
    currentIncome = null;
    showModal = true;
  }

  function handleEdit(income: Income) {
    currentIncome = income;
    showModal = true;
  }

  function handleCloseModal() {
    showModal = false;
    loadIncomes();
  }

  function renderEditButton(income: Income) {
    return `<button on:click={() => handleEdit(income)}>Edit</button>`;
  }

  onMount(loadIncomes);
</script>

<div class="p-4 bg-gray-900 rounded-lg shadow-md" role="region" aria-labelledby="income-heading">
  <h2 id="income-heading" class="text-2xl font-bold mb-4 text-white">Income</h2>

  <button
    on:click={handleAdd}
    class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
  >
    Add Income
  </button>

  {#if isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if error}
    <Error message={error} />
  {:else}
    <List
      items={incomes}
      columns={[
        { key: "date", label: "Date" },
        { key: "amount", label: "Amount" },
        { key: "source", label: "Source" },
        { key: "description", label: "Description" },
      ]}
      onEdit={handleEdit}  
    />
  {/if}

  {#if showModal}
    <AddEditIncomeModal {currentIncome} on:close={handleCloseModal} />
  {/if}
</div>
