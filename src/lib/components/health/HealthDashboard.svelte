<script lang="ts">
  import { page } from '$app/stores';
  import HolisticHealthTracker from './HolisticHealthTracker.svelte';
  import PhysicalHealthTracker from './PhysicalHealthTracker.svelte';
  import MentalHealthTracker from './MentalHealthTracker.svelte';
  import EmotionalHealthTracker from './EmotionalHealthTracker.svelte';
  import WearableDeviceIntegration from './WearableDeviceIntegration.svelte';
  import HealthPlanGenerator from './HealthPlanGenerator.svelte';
  import PredictiveHealthModel from './PredictiveHealthModel.svelte';
  import HealthDataVisualization from './HealthDataVisualization.svelte';

  $: currentPath = $page.url.pathname;
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  {#if currentPath === '/health' || currentPath === '/health/'}
    <HolisticHealthTracker />
  {:else if currentPath === '/health/physical'}
    <PhysicalHealthTracker />
  {:else if currentPath === '/health/mental'}
    <MentalHealthTracker />
  {:else if currentPath === '/health/emotional'}
    <EmotionalHealthTracker />
  {:else if currentPath === '/health/wearables'}
    <WearableDeviceIntegration />
  {:else if currentPath === '/health/plan'}
    <HealthPlanGenerator />
  {:else if currentPath === '/health/predictions'}
    <PredictiveHealthModel />
  {:else if currentPath === '/health/visualization'}
    <HealthDataVisualization />
  {:else}
    <p>Page not found: {currentPath}</p>
  {/if}
</div>