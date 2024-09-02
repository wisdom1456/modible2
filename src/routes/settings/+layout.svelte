<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { writable } from 'svelte/store';
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from '$lib/types';

  const settingsNavItems: NavItem[] = [
    { href: "/settings/overview", label: "Overview" },
    { href: "/settings/security", label: "Security" },
    { href: "/settings/notifications", label: "Notifications" },
    { href: "/settings/billing", label: "Billing" },
    { href: "/settings/privacy", label: "Privacy" },
  ];

  const sectionTitle = "Settings";
  const sectionDescription = "Manage your account preferences";

  const settingsSummary: SectionSummary = {
    accountType: { label: "Account Type", value: "Premium" },
    securityLevel: { label: "Security Level", value: "High" },
    notificationPreferences: { label: "Notification Preferences", value: "Email, SMS" },
  };

  const activeSection = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Settings - {sectionTitle}</title>
</svelte:head>

<div class="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 bg-gray-700/10">
  <SecondaryNavigation
    sections={settingsNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
    on:sectionChange={(event) => handleSectionChange(event.detail)}
  />
  <div>
    <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
    <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
  </div>

  <!-- Settings Summary -->
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {#each Object.entries(settingsSummary) as [key, { label, value }]}
      <SummaryCard {label} {value} />
    {/each}
  </div>
</div>

<main class="p-4 sm:p-6 lg:p-8">
  <slot />
</main>