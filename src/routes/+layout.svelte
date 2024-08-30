<script lang="ts">
  import Navigation from '$lib/components/navigation/Navigation.svelte';
  import '../app.css';

  const mainNavItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/health', label: 'Health' },
    { href: '/finance', label: 'Finance' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/knowledge', label: 'Knowledge' },
  ];
</script>

<div class="flex h-screen bg-gray-100">
  <div class="flex-1 flex flex-col overflow-hidden">
    <Navigation items={mainNavItems} />
    <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div class="container mx-auto px-6 py-8">
        <slot />
      </div>
    </main>
  </div>
</div>