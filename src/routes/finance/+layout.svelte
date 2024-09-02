<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  const financeNavItems: NavItem[] = [
    { href: "/finance/overview", label: "Overview" },
    { href: "/finance/advanced", label: "Advanced" },
    { href: "/finance/balance", label: "Balance" },
    { href: "/finance/budgets", label: "Budgets" },
    { href: "/finance/expenses", label: "Expenses" },
    { href: "/finance/goals", label: "Goals" },
    { href: "/finance/income", label: "Income" },
    { href: "/finance/insights", label: "Insights" },
    { href: "/finance/investments", label: "Investments" },
    { href: "/finance/reports", label: "Reports" },
    { href: "/finance/track", label: "Track" },
  ];

  const sectionTitle = "Finance";
  const sectionDescription = "Manage your financial activities";

  const financeSummary: SectionSummary = {
    totalBalance: { label: "Total Balance", value: "$10,000" },
    monthlyExpenses: { label: "Monthly Expenses", value: "$2,000" },
    investmentGrowth: { label: "Investment Growth", value: "5%" },
  };

  const activeSection = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Finance - {sectionTitle}</title>
</svelte:head>

<div class="finance-layout">
  <SecondaryNavigation
    sections={financeNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
    on:sectionChange={(event) => handleSectionChange(event.detail)}
  />
  <div class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
  <div>
    <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
    <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
  </div>

  <!-- Finance Summary -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each Object.entries(financeSummary) as [key, { label, value }]}
      <SummaryCard {label} {value} />
    {/each}
  </div>
</div>

<main class="p-4 sm:p-6 lg:p-8">
  <slot />
  </main>
</div>
