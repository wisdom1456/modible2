<script lang="ts">
  import { onMount } from 'svelte';
  import { healthStore } from '$lib/stores/healthStore';
  import type { PhysicalHealthData } from '$lib/types';

  let physicalHealth: PhysicalHealthData;

  onMount(async () => {
    physicalHealth = await healthStore.getPhysicalHealthData();
  });

  function updatePhysicalHealth(metric: string, value: number) {
    healthStore.updatePhysicalHealth(metric, value);
  }

  function setPhysicalHealthGoal(metric: string, target: number) {
    healthStore.setPhysicalHealthGoal(metric, target);
  }
</script>

<div class="physical-health-tracker">
  <h2>Physical Health</h2>
  
  <div class="metric-input">
    <label for="weight">Weight (kg)</label>
    <input
      type="number"
      id="weight"
      bind:value={physicalHealth.weight}
      on:change={() => updatePhysicalHealth('weight', physicalHealth.weight)}
    />
  </div>
  
  <!-- Add more metric inputs (e.g., steps, exercise minutes) -->

  <div class="health-goals">
    <h3>Goals</h3>
    <!-- Add goal-setting inputs -->
  </div>

  <div class="health-charts">
    <!-- Add charts for physical health metrics -->
  </div>
</div>

<style>
  /* Add styles for the physical health tracker */
</style>