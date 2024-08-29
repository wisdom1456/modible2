<script lang="ts">
  import '../app.css';
  import MainNavigation from '$lib/components/navigation/MainNavigation.svelte';
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';

  let activeSection = writable('dashboard');

  $: sectionMenuItems = {
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

  $: currentMenuItems = sectionMenuItems[$page.url.pathname.split('/')[1]] || [];
</script>

<MainNavigation {activeSection} />

<div>
  <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
  {#if currentMenuItems.length > 0}
    <div class="relative z-50 xl:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>
      <div class="fixed inset-0 flex">
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
            <button type="button" class="-m-2.5 p-2.5">
              <span class="sr-only">Close sidebar</span>
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <nav class="flex flex-1 flex-col">
              <ul class="flex flex-1 flex-col gap-y-7">
                {#each currentMenuItems as item}
                  <li>
                    <a href={item.href} class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                      {item.label}
                    </a>
                  </li>
                {/each}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Static sidebar for desktop -->
  {#if currentMenuItems.length > 0}
    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
        </div>
        <nav class="flex flex-1 flex-col">
          <ul class="flex flex-1 flex-col gap-y-7">
            {#each currentMenuItems as item}
              <li>
                <a href={item.href} class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white">
                  {item.label}
                </a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>
    </div>
  {/if}

  <!-- Main content area -->
  <main class="py-10 lg:pl-72">
    <div class="px-4 sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>
</div>