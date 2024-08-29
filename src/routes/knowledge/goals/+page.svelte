<script lang="ts">
  import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';

  const knowledgeNavItems = [
    { href: '/knowledge', label: 'Overview' },
    { href: '/knowledge/library', label: 'Library' },
    { href: '/knowledge/courses', label: 'Courses' },
    { href: '/knowledge/skills', label: 'Skills' },
    { href: '/knowledge/goals', label: 'Learning Goals' },
  ];
</script>

<ModuleNavigation module="Knowledge" items={knowledgeNavItems} />
<h1>Learning Goals Placeholder</h1>
<p>This page is under construction.</p>