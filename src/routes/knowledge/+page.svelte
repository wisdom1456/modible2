<script lang="ts">
    import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';
    import Knowledge from '$lib/components/knowledge/Knowledge.svelte';

    const knowledgeNavItems = [
        { href: '/knowledge', label: 'Overview' },
        { href: '/knowledge/library', label: 'Library' },
        { href: '/knowledge/courses', label: 'Courses' },
        { href: '/knowledge/skills', label: 'Skills' },
        { href: '/knowledge/goals', label: 'Learning Goals' },
    ];
</script>

<Knowledge />