<script lang="ts">
  let investments = [];
  let newInvestment = { name: '', value: 0, allocation: 0 };
  let isLoading = false;
  let error = null;

  async function addInvestment() {
    isLoading = true;
    error = null;
    try {
      // Implement logic to add a new investment
    } catch (e) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="investments-heading">
  <h2 id="investments-heading" class="text-2xl font-bold mb-4 text-gray-800">Investments</h2>
  <p class="text-gray-600">This is the investments page.</p>
  {#if isLoading}
    <p class="text-gray-600">Loading investments data...</p>
  {:else if error}
    <p class="text-red-500" role="alert">Error: {error}</p>
  {:else}
    <ul class="space-y-2">
      {#each investments as investment}
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span class="text-gray-800">{investment.name}</span>
          <span class="text-gray-800">${investment.value} (Allocation: {investment.allocation}%)</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addInvestment} class="mt-4 space-y-4" aria-label="Add new investment">
      <input bind:value={newInvestment.name} placeholder="Investment Name" required class="input" />
      <input type="number" bind:value={newInvestment.value} placeholder="Value" required class="input" />
      <input type="number" bind:value={newInvestment.allocation} placeholder="Allocation %" required class="input" />
      <button type="submit" class="btn">Add Investment</button>
    </form>
  {/if}
</div>