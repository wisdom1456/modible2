<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  const dashboardNavItems: NavItem[] = [
    { href: "/dashboard/", label: "Overview" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/reports", label: "Reports" },
  ];

  const sectionTitle = "Dashboard";
  const sectionDescription = "View your overall performance and insights";

  const dashboardSummary: SectionSummary = {
    totalUsers: { label: "Total Users", value: "10,234" },
    activeProjects: { label: "Active Projects", value: "23" },
    revenue: { label: "Revenue", value: "$543,210" },
  };

  $: activeSection = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Dashboard - {sectionTitle}</title>
</svelte:head>

<div class="dashboard-layout">
  <SecondaryNavigation
    sections={dashboardNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
    on:sectionChange={(event) => handleSectionChange(event.detail)}
  />
  <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
    <div>
      <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
      <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
    </div>

    <!-- Dashboard Summary -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each Object.entries(dashboardSummary) as [key, { label, value }]}
        <SummaryCard {label} {value} />
      {/each}
    </div>
  </div>

  <main class="p-4 sm:p-6 lg:p-8">
    <slot />
  </main>
</div>