<script lang="ts">
    import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';
    import Health from '$lib/components/health/Health.svelte';

    const healthNavItems = [
        { href: '/health', label: 'Overview' },
        { href: '/health/tracker', label: 'Health Tracker' },
        { href: '/health/goals', label: 'Health Goals' },
    ];
</script>

<Health />