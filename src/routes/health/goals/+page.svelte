<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';
  import { onMount } from 'svelte';
  import { healthStore } from '$lib/stores/healthStore';
  import type { HealthGoal } from '$lib/types';

  const healthNavItems = [
    { href: '/health', label: 'Overview' },
    { href: '/health/tracker', label: 'Health Tracker' },
    { href: '/health/goals', label: 'Health Goals' },
  ];

  let goals: HealthGoal[] = [];

  onMount(() => {
    const unsubscribe = healthStore.subscribe(value => {
      if (value && Array.isArray(value.goals)) {
        goals = value.goals;
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<ModuleNavigation items={healthNavItems} />

<div class="p-8 bg-gray-100 min-h-screen">
  <h1 class="text-2xl font-bold mb-4">Health Goals</h1>
  {#if goals.length > 0}
    <ul>
      {#each goals as goal (goal.title)}
        <li class="mb-4 p-4 bg-white rounded-lg shadow">
          <h3 class="text-xl font-semibold mb-2">{goal.title}</h3>
          <p class="mb-2">{goal.description}</p>
          <p class="mb-2">Metric: {goal.metric}</p>
          <p class="mb-2">Target: {goal.target}</p>
          <p class="mb-2">Current: {goal.currentValue}</p>
          <p class="mb-2">Target Date: {new Date(goal.targetDate).toLocaleDateString()}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-lg">You have not set any health goals yet. Start by adding a new goal to track your health progress.</p>
  {/if}
</div>