<script lang="ts">
  import { page } from "$app/stores";
  import Sidebar from "./Sidebar.svelte";
  import type { NavItem } from '$lib/types';
  import { onMount } from 'svelte';

  const mainNavItems: NavItem[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/health", label: "Health" },
    { href: "/finance", label: "Finance" },
    { href: "/tasks", label: "Tasks" },
    { href: "/knowledge", label: "Knowledge" },
  ];
</script>

<div class="flex h-screen">
  <div>
    <!-- Off-canvas menu for mobile -->
    <div class="relative z-50 xl:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-secondary/80" aria-hidden="true"></div>

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

          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 ring-1 ring-white/5">
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
            </div>
            <Sidebar items={mainNavItems} />
          </div>
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-secondary px-6 ring-1 ring-white/5">
        <div class="flex h-16 shrink-0 items-center">
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
          <a href="/" class="ml-2 text-accent-color">Modible</a>
        </div>
        <Sidebar items={mainNavItems} />
      </div>
    </div>

    <div class="xl:pl-72">
      <!-- Sticky search header -->
      <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-primary px-4 shadow-sm sm:px-6 lg:px-8">
        <button type="button" class="-m-2.5 p-2.5 text-secondary xl:hidden">
          <span class="sr-only">Open sidebar</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
          </svg>
        </button>

        <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form class="flex flex-1" action="#" method="GET">
            <label for="search-field" class="sr-only">Search</label>
            <div class="relative w-full">
              <svg class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
              </svg>
              <input id="search-field" class="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-primary placeholder:text-secondary focus:ring-0 sm:text-sm" placeholder="Search..." type="search" name="search" />
            </div>
          </form>
        </div>
      </div>

      <main>
        <slot />
      </main>
    </div>
  </div>
</div>
