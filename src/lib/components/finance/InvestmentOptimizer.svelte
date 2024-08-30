<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { FinancialGoal } from '$lib/types';

  let goals: FinancialGoal[] = [];
  let newGoal: FinancialGoal = { id: '', name: '', targetAmount: 0, currentAmount: 0, targetDate: new Date() };
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      goals = await financeStore.getFinancialGoals();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });

  async function addGoal() {
    try {
      await financeStore.addFinancialGoal(newGoal);
      newGoal = { id: '', name: '', targetAmount: 0, currentAmount: 0, targetDate: new Date() };
      goals = await financeStore.getFinancialGoals();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    }
  }

  async function deleteGoal(id: string) {
    try {
      await financeStore.deleteFinancialGoal(id);
      goals = await financeStore.getFinancialGoals();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    }
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Financial Goal Planner</h2>
  <ul class="space-y-2">
    {#each goals as goal}
      <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
        <span>{goal.name}</span>
        <span>${goal.targetAmount}</span>
        <button on:click={() => deleteGoal(goal.id)} class="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </li>
    {/each}
  </ul>
  <form on:submit|preventDefault={addGoal} class="mt-4 space-y-4">
    <input id="name" type="text" bind:value={newGoal.name} placeholder="Goal Name" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input id="targetAmount" type="number" bind:value={newGoal.targetAmount} placeholder="Target Amount" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input id="currentAmount" type="number" bind:value={newGoal.currentAmount} placeholder="Current Amount" required class="w-full p-2 border border-gray-300 rounded-md" />
    <input id="targetDate" type="date" bind:value={newGoal.targetDate} required class="w-full p-2 border border-gray-300 rounded-md" />
    <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Goal</button>
  </form>
</div>