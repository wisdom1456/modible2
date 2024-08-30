<script lang="ts">
  import Navigation from '$lib/components/navigation/Navigation.svelte';

  const tasksNavItems = [
    { href: '/tasks', label: 'Overview' },
    { href: '/tasks/list', label: 'Task List' },
    { href: '/tasks/calendar', label: 'Calendar' },
    { href: '/tasks/projects', label: 'Projects' },
    { href: '/tasks/analytics', label: 'Analytics' },
  ];
</script>

<Navigation items={tasksNavItems} module="Tasks" />
<slot />