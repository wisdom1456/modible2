<script lang="ts">
  import { healthStore } from '$lib/stores/healthStore';
  import type { HealthPlan } from '$lib/types';

  let healthPlan: HealthPlan = { id: '', name: '', goals: [] };

  async function generateHealthPlan() {
    healthPlan = await healthStore.generateHealthPlan();
  }

  function updateHealthPlan(planItem: string, value: any) {
    healthStore.updateHealthPlan(planItem, value);
  }

  function saveHealthPlan() {
    healthStore.saveHealthPlan(healthPlan);
  }
</script>

<div class="health-plan-generator">
  <h2>Personalized Health Plan</h2>
  
  <button on:click={generateHealthPlan}>Generate New Plan</button>

  {#if healthPlan}
    <div class="health-plan">
      <!-- Display and allow editing of health plan items -->
    </div>
    <button on:click={saveHealthPlan}>Save Plan</button>
  {/if}
</div>

<style>
  /* Add styles for the health plan generator */
</style>