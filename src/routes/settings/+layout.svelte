<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  const tasksNavItems: NavItem[] = [
    { href: "/tasks", label: "All Tasks" },
    { href: "/tasks/active", label: "Active" },
    { href: "/tasks/completed", label: "Completed" },
    { href: "/tasks/assigned", label: "Assigned to Me" },
    { href: "/tasks/analytics", label: "Analytics" },
  ];

  const sectionTitle = "Tasks";
  const sectionDescription = "Manage and track your tasks";

  const tasksSummary: SectionSummary = {
    totalTasks: { label: "Total Tasks", value: "42" },
    activeTasks: { label: "Active Tasks", value: "18" },
    completedTasks: { label: "Completed Tasks", value: "24" },
  };

  $: activeSection = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Tasks - {sectionTitle}</title>
</svelte:head>

<div class="tasks-layout">
  <SecondaryNavigation
    sections={tasksNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
    on:sectionChange={(event) => handleSectionChange(event.detail)}
  />
  <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
      <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
    </div>

    <!-- Tasks Summary -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each Object.entries(tasksSummary) as [key, { label, value }]}
        <SummaryCard {label} {value} />
      {/each}
    </div>
  </div>

  <main class="p-4 sm:p-6 lg:p-8">
    <slot />
  </main>
</div>