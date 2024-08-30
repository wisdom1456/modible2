<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';
  import type { FinancialProfile } from '$lib/types';

  let profile: FinancialProfile | null = null;

  onMount(async () => {
    profile = await financeStore.getFinancialProfile();
  });

  async function updateProfile() {
    if (profile) {
      await financeStore.updateFinancialProfile(profile);
      alert('Profile updated successfully');
    }
  }
</script>

<div class="bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4">Financial Profile</h2>
  {#if profile}
    <form on:submit|preventDefault={updateProfile} class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input id="name" bind:value={profile.name} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input id="email" type="email" bind:value={profile.email} class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
      </div>
      <!-- Add more fields as needed -->
      <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update Profile</button>
    </form>
  {:else}
    <p class="text-gray-600">Loading profile...</p>
  {/if}
</div>