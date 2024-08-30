<script lang="ts">
  import { page } from '$app/stores';
  export let currentMenuItems: { href: string; label: string }[];
</script>

<style>
  /* Tailwind classes will handle the styling */
</style>

<nav class="main-nav">
  <a href="/dashboard" class:active={$page.url.pathname === '/dashboard'}>Dashboard</a>
  <a href="/health" class:active={$page.url.pathname.startsWith('/health')}>Health</a>
  <a href="/finance" class:active={$page.url.pathname.startsWith('/finance')}>Finance</a>
  <a href="/tasks" class:active={$page.url.pathname.startsWith('/tasks')}>Tasks</a>
  <a href="/knowledge" class:active={$page.url.pathname.startsWith('/knowledge')}>Knowledge</a>
</nav>

<nav class="module-nav">
  {#each currentMenuItems as item}
    <a href={item.href} class="nav-item">{item.label}</a>
  {/each}
</nav>