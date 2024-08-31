<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import type { FinancialSummary } from '$lib/types';

  const menuItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/health', label: 'Health' },
    { href: '/finance', label: 'Finance' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/knowledge', label: 'Knowledge' },
  ];

  let activeSection = writable('overview');
  let financialSummary: FinancialSummary | null = null;

  $: currentModule = $page.url.pathname.split('/')[1] || 'dashboard';

  $: secondaryNavSections = getSecondaryNavSections(currentModule);

  function getSecondaryNavSections(module: string) {
    switch (module) {
      case 'dashboard':
        return [
          { name: 'Overview', key: 'overview' },
          { name: 'Analytics', key: 'analytics' },
        ];
      case 'health':
        return [
          { name: 'Overview', key: 'overview' },
          { name: 'Physical Health', key: 'physical' },
          { name: 'Mental Health', key: 'mental' },
          { name: 'Emotional Health', key: 'emotional' },
          { name: 'Wearable Devices', key: 'wearables' },
          { name: 'Health Plan', key: 'plan' },
          { name: 'Health Predictions', key: 'predictions' },
          { name: 'Data Visualization', key: 'visualization' },
        ];
      case 'finance':
        return [
          { name: 'Dashboard', key: 'dashboard' },
          { name: 'Budget', key: 'budget' },
          { name: 'Expenses', key: 'expenses' },
          { name: 'Income', key: 'income' },
          { name: 'Investments', key: 'investments' },
          { name: 'Goals', key: 'goals' },
        ];
      case 'tasks':
        return [
          { name: 'Overview', key: 'overview' },
          { name: 'List', key: 'list' },
          { name: 'Calendar', key: 'calendar' },
        ];
      case 'knowledge':
        return [
          { name: 'Overview', key: 'overview' },
          { name: 'Library', key: 'library' },
          { name: 'Courses', key: 'courses' },
          { name: 'Skills', key: 'skills' },
          { name: 'Learning Goals', key: 'goals' },
        ];
      default:
        return [];
    }
  }

  function changeSection(section: string) {
    activeSection.set(section);
  }
</script>

<nav class="bg-gray-900 text-gray-300 h-full w-64 overflow-y-auto">
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4 text-white">Modible</h2>
    <ul>
      {#each menuItems as item}
        <li class="mb-2">
          <a
            href={item.href}
            class="block py-2 px-4 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200"
            class:bg-gray-800={$page.url.pathname === item.href}
            class:text-white={$page.url.pathname === item.href}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  {#if secondaryNavSections.length > 0}
    <div class="mt-4 px-4">
      <h3 class="text-lg font-semibold mb-2 text-white">{currentModule.charAt(0).toUpperCase() + currentModule.slice(1)}</h3>
      <ul>
        {#each secondaryNavSections as section}
          <li class="mb-2">
            <a
              href={`/${currentModule}/${section.key === 'overview' ? '' : section.key}`}
              class="block py-1 px-4 rounded hover:bg-gray-800 hover:text-white transition-colors duration-200"
              class:bg-gray-800={$page.url.pathname === `/${currentModule}/${section.key === 'overview' ? '' : section.key}`}
              class:text-white={$page.url.pathname === `/${currentModule}/${section.key === 'overview' ? '' : section.key}`}
            >
              {section.name}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</nav>