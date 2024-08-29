<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { FinancialGoal } from '$lib/types';

  let goals: FinancialGoal[] = [];
  let newGoal: FinancialGoal = { id: '', name: '', amount: 0, deadline: new Date() };

  onMount(async () => {
    goals = await financeStore.getFinancialGoals();
  });

  function addGoal() {
    financeStore.addFinancialGoal(newGoal);
    newGoal = { id: '', name: '', amount: 0, deadline: new Date() };
  }

  function deleteGoal(id: string) {
    financeStore.deleteFinancialGoal(id);
  }
</script>

<div class="card">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Financial Goal Planner</h2>
  <div class="goals space-y-4">
    {#each goals as goal}
      <div class="goal-item flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
        <span class="text-lg font-medium text-gray-700">{goal.name}</span>
        <span class="text-lg font-medium text-gray-700">${goal.amount}</span>
        <button on:click={() => deleteGoal(goal.id)} class="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
      </div>
    {/each}
  </div>
  <div class="form-group mt-4">
    <label for="name" class="block text-sm font-medium text-gray-700">Goal Name</label>
    <input id="name" type="text" bind:value={newGoal.name} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <div class="form-group mt-4">
    <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
    <input id="amount" type="number" bind:value={newGoal.amount} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <div class="form-group mt-4">
    <label for="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
    <input id="deadline" type="date" bind:value={newGoal.deadline} class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
  </div>
  <button on:click={addGoal} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Goal</button>
</div>

<style>
  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
</style>