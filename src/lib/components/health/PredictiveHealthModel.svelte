<script lang="ts">
  import { onMount } from 'svelte';
  import { healthStore } from '$lib/stores/healthStore';
  import { PredictionChart } from '$lib/components/charts';

  let predictions: any;
  let recommendations: any;

  onMount(async () => {
    predictions = await healthStore.getHealthPredictions();
    recommendations = await healthStore.getPredictionRecommendations();
  });
</script>

<div class="predictive-health-model">
  <h2>Health Predictions</h2>
  
  <PredictionChart data={predictions} />

  <div class="recommendations">
    <h3>Recommended Actions</h3>
    {#each recommendations as recommendation}
      <div class="recommendation">
        <p>{recommendation.text}</p>
        <button on:click={() => healthStore.applyRecommendation(recommendation.id)}>Apply</button>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add styles for the predictive health model component */
</style>