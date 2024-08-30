<script lang="ts">
  // Add any necessary imports and logic here
  let budgetCategories: any[] = []; // This should be populated with actual budget data
  let newCategory = { name: '', amount: 0 };
  let isLoading = false;
  let error = null;

  async function addCategory() {
    // Implement logic to add a new budget category
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="budget-heading">
  <h2 id="budget-heading" class="text-2xl font-bold mb-4 text-gray-800">Budget</h2>
  <p class="text-gray-600">This is the budget page.</p>
  {#if isLoading}
    <p class="text-gray-600">Loading budget categories...</p>
  {:else if error}
    <p class="text-red-500" role="alert">Error: {error}</p>
  {:else}
    <ul class="space-y-2">
      {#each budgetCategories as category}
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span class="text-gray-800">{category.name}</span>
          <span class="text-gray-800">${category.amount}</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addCategory} class="mt-4 space-y-4" aria-label="Add new budget category">
      <input bind:value={newCategory.name} placeholder="Category Name" required class="input" />
      <input type="number" bind:value={newCategory.amount} placeholder="Amount" required class="input" />
      <button type="submit" class="btn">Add Category</button>
    </form>
  {/if}
</div>

<!--
<style>
  .error {
    color: red;
  }
</style>
-->