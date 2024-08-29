<script>
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import SearchBar from './SearchBar.svelte';

  let isMobileMenuOpen = false;
  let activeSection = writable('dashboard');

  const topLevelMenuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/health', label: 'Health' },
    { href: '/finance', label: 'Finance' },
    { href: '/tasks', label: 'Tasks' },
    { href: '/knowledge', label: 'Knowledge' },
  ];

  const sectionMenuItems = {
    dashboard: [],
    health: [
      { href: '/health', label: 'Overview' },
      { href: '/health/tracker', label: 'Health Tracker' },
      { href: '/health/goals', label: 'Health Goals' },
    ],
    finance: [
      { href: '/finance', label: 'Overview' },
      { href: '/finance/budget', label: 'Budget' },
      { href: '/finance/expenses', label: 'Expenses' },
      { href: '/finance/income', label: 'Income' },
      { href: '/finance/investments', label: 'Investments' },
      { href: '/finance/goals', label: 'Goals' },
    ],
    tasks: [
      { href: '/tasks', label: 'Overview' },
      { href: '/tasks/list', label: 'Task List' },
      { href: '/tasks/calendar', label: 'Calendar' },
      { href: '/tasks/projects', label: 'Projects' },
    ],
    knowledge: [
      { href: '/knowledge', label: 'Overview' },
      { href: '/knowledge/library', label: 'Library' },
      { href: '/knowledge/courses', label: 'Courses' },
      { href: '/knowledge/skills', label: 'Skills' },
      { href: '/knowledge/goals', label: 'Learning Goals' },
    ],
  };

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function handleTopLevelNavigation(section) {
    activeSection.set(section);
  }

  /**
   * @param {CustomEvent<import('$lib/types').SearchEventDetail>} event
   */
  function handleSearch(event) {
    // Implement search functionality
    console.log('Search term:', event.detail.term);
  }
</script>

<nav class="bg-gray-800 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0">
          <img class="h-8 w-8" src="/logo.png" alt="Modible" />
        </a>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            {#each topLevelMenuItems as item}
              <a
                href={item.href}
                class="px-3 py-2 rounded-md text-sm font-medium {$page.url.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
                on:click={() => handleTopLevelNavigation(item.label.toLowerCase())}
              >
                {item.label}
              </a>
            {/each}
          </div>
        </div>
      </div>
      <div class="hidden md:block">
        <SearchBar on:search={handleSearch} />
      </div>
      <div class="-mr-2 flex md:hidden">
        <button
          on:click={toggleMobileMenu}
          type="button"
          class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  {#if isMobileMenuOpen}
    <div
      class="md:hidden"
      transition:fly={{ y: -100, duration: 300 }}
    >
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each topLevelMenuItems as item}
          <a
            href={item.href}
            class="block px-3 py-2 rounded-md text-base font-medium {$page.url.pathname === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}"
            on:click={() => handleTopLevelNavigation(item.label.toLowerCase())}
          >
            {item.label}
          </a>
        {/each}
      </div>
      <div class="px-2 pt-2 pb-3">
        <SearchBar on:search={handleSearch} />
      </div>
    </div>
  {/if}
</nav>