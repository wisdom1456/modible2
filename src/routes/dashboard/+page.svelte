<script lang="ts">
    import SecondaryNavigation from '$lib/components/navigation/SecondaryNavigation.svelte';
    import { writable } from 'svelte/store';
    import UnifiedDashboard from '$lib/components/dashboard/UnifiedDashboard.svelte';
  
    let activeSection = writable('overview');
    const sections = [
      { name: 'Overview', key: 'overview' },
      { name: 'Analytics', key: 'analytics' },
    ];
  
    function changeSection(section: string) {
      activeSection.set(section);
    }
  </script>
  
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
    <SecondaryNavigation {sections} {changeSection} {activeSection} />
  
    {#if $activeSection === 'overview'}
      <p class="text-gray-600">Welcome to your dashboard overview.</p>
      <UnifiedDashboard />
    {:else if $activeSection === 'analytics'}
      <p class="text-gray-600">Here are your dashboard analytics.</p>
    {/if}
  </div>
