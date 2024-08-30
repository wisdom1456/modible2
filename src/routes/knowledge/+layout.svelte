<script lang="ts">
  import Navigation from '$lib/components/navigation/Navigation.svelte';

  const knowledgeNavItems = [
    { href: '/knowledge', label: 'Overview' },
    { href: '/knowledge/library', label: 'Library' },
    { href: '/knowledge/courses', label: 'Courses' },
    { href: '/knowledge/skills', label: 'Skills' },
    { href: '/knowledge/goals', label: 'Learning Goals' },
  ];
</script>

<Navigation items={knowledgeNavItems} module="Knowledge" />
<slot />