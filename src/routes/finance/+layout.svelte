<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { derived } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  const financeNavItems: NavItem[] = [
    { href: "/finance", label: "Overview" },
    { href: "/finance/expenses", label: "Expenses" },
    { href: "/finance/budget", label: "Budget" },
    { href: "/finance/income", label: "Income" },
    { href: "/finance/transactions", label: "Transactions" },
    { href: "/finance/accounts", label: "Accounts" },
  ];

  const sections = financeNavItems.map((item) => ({
    name: item.label,
    key: item.href,
  }));

  const sectionTitle = "Finance";
  const sectionDescription = "Manage your financial activities";

  const financeSummary: SectionSummary = {
    totalBalance: { label: "Total Balance", value: "$10,000" },
    monthlyExpenses: { label: "Monthly Expenses", value: "$2,000" },
    investmentGrowth: { label: "Investment Growth", value: "5%" },
  };

  // Create a derived store for 'activeSection' based on the page's URL pathname
  const activeSection = derived(page, ($page) => $page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Finance - {sectionTitle}</title>
</svelte:head>

<div class="finance-layout">
  <SecondaryNavigation
    {sections}
    changeSection={handleSectionChange}
    {activeSection}
  />

  <div class="flex flex-col items-start justify-between gap-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
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
