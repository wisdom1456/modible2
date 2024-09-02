<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { writable, type Writable } from "svelte/store";
  import SecondaryNavigation from "$lib/components/navigation/SecondaryNavigation.svelte";
  import SummaryCard from "$lib/components/SummaryCard.svelte";
  import type { NavItem, SectionSummary } from "$lib/types";

  const healthNavItems: NavItem[] = [
    { href: "/health", label: "Overview" },
    { href: "/health/emotional", label: "Emotional" },
    { href: "/health/fitness", label: "Fitness" },
    { href: "/health/goals", label: "Goals" },
    { href: "/health/mental", label: "Mental" },
    { href: "/health/nutrition", label: "Nutrition" },
    { href: "/health/physical", label: "Physical" },
    { href: "/health/plan", label: "Plan" },
    { href: "/health/predictions", label: "Predictions" },
    { href: "/health/sleep", label: "Sleep" },
    { href: "/health/tracker", label: "Tracker" },
    { href: "/health/visualization", label: "Visualization" },
    { href: "/health/wearables", label: "Wearables" },
  ];

  const sectionTitle = "Health Hub";
  const sectionDescription = "Expand your knowledge and skills";

  const healthSummary: SectionSummary = {
    totalArticles: { label: "Total Articles", value: "1,234" },
    completedCourses: { label: "Completed Courses", value: "56" },
    libraryBooks: { label: "Library Books", value: "345" },
    bookmarks: { label: "Bookmarks", value: "789" },
  };

  let activeSection: Writable<string> = writable($page.url.pathname);

  function handleSectionChange(section: string) {
    goto(section);
  }
</script>

<svelte:head>
  <title>Health - {sectionTitle}</title>
</svelte:head>

<div class="health-layout">
  <SecondaryNavigation
    sections={healthNavItems.map((item) => ({ name: item.label, key: item.href }))}
    {activeSection}
    changeSection={handleSectionChange}
  />
  <div
    class="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8"
  >
    <div>
      <h1 class="text-2xl font-semibold text-white">{sectionTitle}</h1>
      <p class="mt-2 text-sm text-gray-400">{sectionDescription}</p>
    </div>

    <!-- Health Summary -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {#each Object.entries(healthSummary) as [key, { label, value }]}
        <SummaryCard {label} {value} />
      {/each}
    </div>
  </div>

  <main class="p-4 sm:p-6 lg:p-8">
    <slot />
  </main>
</div>
