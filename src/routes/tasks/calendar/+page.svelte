<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';

  const taskNavItems = [
    { href: '/tasks', label: 'Overview' },
    { href: '/tasks/list', label: 'Task List' },
    { href: '/tasks/calendar', label: 'Calendar' },
    { href: '/tasks/projects', label: 'Projects' },
  ];
</script>

<ModuleNavigation module="Tasks" items={taskNavItems} />
<h1>Calendar Placeholder</h1>
<p>This page is under construction.</p>