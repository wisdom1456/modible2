<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  export let sectionNavItems: NavItem[];
  export let sectionTitle: string;
  export let sectionDescription: string;

  $: activeSection = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<header>
  <SecondaryNavigation
    sections={sectionNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
    on:sectionChange={(event) => handleSectionChange(event.detail)}
  />
  <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
      <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
    </div>

    <!-- Section Summary -->
    <slot name="summary" />
  </div>
</header>

<main class="p-4 sm:p-6 lg:p-8">
  <slot />
</main>