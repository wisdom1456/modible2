<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';

  const healthNavItems = [
    { href: '/health', label: 'Overview' },
    { href: '/health/tracker', label: 'Health Tracker' },
    { href: '/health/goals', label: 'Health Goals' },
  ];
</script>

<ModuleNavigation module="Health" items={healthNavItems} />
<h1>Health Goals Placeholder</h1>
<p>This page is under construction.</p>