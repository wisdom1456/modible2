<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  const knowledgeNavItems: NavItem[] = [
    { href: "/knowledge", label: "Overview" },
    { href: "/knowledge/articles", label: "Articles" },
    { href: "/knowledge/courses", label: "Courses" },
    { href: "/knowledge/library", label: "Library" },
    { href: "/knowledge/bookmarks", label: "Bookmarks" },
  ];

  const sectionTitle = "Knowledge Hub";
  const sectionDescription = "Expand your knowledge and skills";

  const knowledgeSummary: SectionSummary = {
    totalArticles: { label: "Total Articles", value: "1,234" },
    completedCourses: { label: "Completed Courses", value: "56" },
    libraryBooks: { label: "Library Books", value: "345" },
    bookmarks: { label: "Bookmarks", value: "789" },
  };

  $: activeSection = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Knowledge - {sectionTitle}</title>
</svelte:head>

<div class="knowledge-layout">
  <SecondaryNavigation
    sections={knowledgeNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
    on:sectionChange={(event) => handleSectionChange(event.detail)}
  />
  <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
      <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
    </div>

    <!-- Knowledge Summary -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each Object.entries(knowledgeSummary) as [key, { label, value }]}
        <SummaryCard {label} {value} />
      {/each}
    </div>
  </div>

  <main class="p-4 sm:p-6 lg:p-8">
    <slot />
  </main>
</div>