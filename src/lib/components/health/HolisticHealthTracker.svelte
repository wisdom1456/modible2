<script lang="ts">
  import { onMount } from 'svelte';
  import PhysicalHealthTracker from './PhysicalHealthTracker.svelte';
  import MentalHealthTracker from './MentalHealthTracker.svelte';
  import EmotionalHealthTracker from './EmotionalHealthTracker.svelte';
  import WearableDeviceIntegration from './WearableDeviceIntegration.svelte';
  import HealthPlanGenerator from './HealthPlanGenerator.svelte';
  import HealthDataVisualization from './HealthDataVisualization.svelte';
  import PredictiveHealthModel from './PredictiveHealthModel.svelte';
  import { healthStore } from '$lib/stores/healthStore';

  let activeTab = 'physical';
  let healthSummary;

  onMount(async () => {
    healthSummary = await healthStore.getHealthSummary();
  });

  function changeTab(tab: string) {
    activeTab = tab;
  }
</script>

<div class="holistic-health-tracker">
  <h1>Holistic Health Tracker</h1>
  
  <div class="health-summary">
    <!-- Display key health metrics -->
  </div>

  <nav class="health-tabs">
    <button class:active={activeTab === 'physical'} on:click={() => changeTab('physical')}>Physical</button>
    <button class:active={activeTab === 'mental'} on:click={() => changeTab('mental')}>Mental</button>
    <button class:active={activeTab === 'emotional'} on:click={() => changeTab('emotional')}>Emotional</button>
  </nav>

  <div class="health-content">
    {#if activeTab === 'physical'}
      <PhysicalHealthTracker />
    {:else if activeTab === 'mental'}
      <MentalHealthTracker />
    {:else if activeTab === 'emotional'}
      <EmotionalHealthTracker />
    {/if}
  </div>

  <WearableDeviceIntegration />
  <HealthPlanGenerator />
  <HealthDataVisualization />
  <PredictiveHealthModel />
</div>

<style>
  /* Add styles for the holistic health tracker layout */
</style>