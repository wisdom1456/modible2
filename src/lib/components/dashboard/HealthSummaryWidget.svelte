<script lang="ts">
  import { onMount } from 'svelte';
  import { healthStore } from '$lib/stores/healthStore';

  let healthSummary: { dailySteps: number } | null = null;

  onMount(async () => {
    healthSummary = await healthStore.getHealthSummary();
  });
</script>

<div class="health-summary-widget">
  <h2>Health Summary</h2>
  {#if healthSummary}
    <p>Daily Steps: {healthSummary.dailySteps}</p>
    <!-- Add more health summary details -->
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  /* Add styles for the health summary widget */
</style>