<script lang="ts">
  import KnowledgeDashboard from '$lib/components/knowledge/KnowledgeDashboard.svelte';

  const knowledgeNavItems = [
    { href: '/knowledge', label: 'Overview' },
    { href: '/knowledge/library', label: 'Library' },
    { href: '/knowledge/courses', label: 'Courses' },
    { href: '/knowledge/skills', label: 'Skills' },
    { href: '/knowledge/goals', label: 'Learning Goals' },
  ];
</script>

<h1>Skills Placeholder</h1>
<p>This page is under construction.</p>

<KnowledgeDashboard />