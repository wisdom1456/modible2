<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { incomesStore } from "$lib/stores/financeStore";
  import type { Income } from "$lib/types/finance";

  export let currentIncome: Income | null = null;
  const dispatch = createEventDispatcher();

  let income: Omit<Income, "id"> = currentIncome
    ? { ...currentIncome }
    : { date: new Date(), amount: 0, source: "", description: "" };
  let isLoading = false;
  let error: string | null = null;

  async function handleSubmit() {
    isLoading = true;
    error = null;
    try {
      if (currentIncome) {
        await incomesStore.updateIncome({ ...income, id: currentIncome.id });
      } else {
        await incomesStore.addIncome(income);
      }
      dispatch("close");
    } catch (e) {
      error = e instanceof Error ? e.message : "Failed to save income";
    } finally {
      isLoading = false;
    }
  }

  async function handleDelete() {
    if (currentIncome) {
      isLoading = true;
      error = null;
      if (currentIncome?.id) {
        try {
          await incomesStore.deleteIncome(currentIncome.id);
          dispatch("close");
        } catch (e) {
          error = e instanceof Error ? e.message : "Failed to delete income";
        } finally {
          isLoading = false;
        }
      }
      isLoading = false;
    }
  }
</script>

<div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
  <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">{currentIncome ? "Edit Income" : "Add Income"}</h2>
    {#if error}
      <p class="text-red-500 mb-4">{error}</p>
    {/if}
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <label class="block">
        <span class="text-gray-700">Date</span>
        <input
          type="date"
          bind:value={income.date}
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">Amount</span>
        <input
          type="number"
          bind:value={income.amount}
          placeholder="Amount"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">Source</span>
        <input
          bind:value={income.source}
          placeholder="Source"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <label class="block">
        <span class="text-gray-700">Description</span>
        <input
          bind:value={income.description}
          placeholder="Description"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </label>
      <div class="flex justify-end">
        <button type="submit" class="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
          >Save</button
        >
        <button
          type="button"
          on:click={handleDelete}
          class="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button
        >
      </div>
    </form>
  </div>
</div>
