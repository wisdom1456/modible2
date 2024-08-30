<script lang="ts">
  export let changeSection: (section: string) => void;
</script>

<nav class="flex justify-center p-4 bg-gray-800 rounded-md">
  <button on:click={() => changeSection('dashboard')} class="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Dashboard</button>
  <button on:click={() => changeSection('budget')} class="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Budget</button>
  <button on:click={() => changeSection('expenses')} class="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Expenses</button>
  <button on:click={() => changeSection('income')} class="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Income</button>
  <button on:click={() => changeSection('investments')} class="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Investments</button>
  <button on:click={() => changeSection('goals')} class="mx-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600">Goals</button>
</nav>