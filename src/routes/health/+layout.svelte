<script lang="ts">
  import Navigation from '$lib/components/navigation/Navigation.svelte';

  const healthNavItems = [
    { href: '/health', label: 'Overview' },
    { href: '/health/physical', label: 'Physical Health' },
    { href: '/health/mental', label: 'Mental Health' },
    { href: '/health/emotional', label: 'Emotional Health' },
    { href: '/health/wearables', label: 'Wearable Devices' },
    { href: '/health/plan', label: 'Health Plan' },
    { href: '/health/predictions', label: 'Health Predictions' },
    { href: '/health/visualization', label: 'Data Visualization' },
  ];
</script>

<Navigation items={healthNavItems} module="Health" />
<slot />