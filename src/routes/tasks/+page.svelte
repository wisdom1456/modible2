<script lang="ts">
    import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';
    import Tasks from '$lib/components/tasks/Tasks.svelte';

    const taskNavItems = [
        { href: '/tasks', label: 'Overview' },
        { href: '/tasks/list', label: 'Task List' },
        { href: '/tasks/calendar', label: 'Calendar' },
        { href: '/tasks/projects', label: 'Projects' },
    ];
</script>

<Tasks />