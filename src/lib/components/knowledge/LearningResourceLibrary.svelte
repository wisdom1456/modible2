<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { LearningResource } from '$lib/types';

  let resources: LearningResource[] = [];
  let newResource: LearningResource = { id: '', title: '', content: '', tags: [], type: '', url: '' };
  let isLoading = true;
  let error: string | null = null;

  onMount(async () => {
    try {
      resources = await knowledgeStore.getResources();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    } finally {
      isLoading = false;
    }
  });

  async function addResource() {
    try {
      await knowledgeStore.addResource(newResource);
      newResource = { id: '', title: '', content: '', tags: [], type: '', url: '' };
      resources = await knowledgeStore.getResources();
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
    }
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Learning Resource Library</h2>
  {#if isLoading}
    <p>Loading resources...</p>
  {:else if error}
    <p class="error text-red-500">Error: {error}</p>
  {:else}
    <ul class="space-y-2">
      {#each resources as resource}
        <li class="flex justify-between p-2 bg-gray-100 rounded-lg">
          <span>{resource.title}</span>
          <span>{resource.type}</span>
        </li>
      {/each}
    </ul>
    <form on:submit|preventDefault={addResource} class="mt-4 space-y-4">
      <input bind:value={newResource.title} placeholder="Resource Title" required class="w-full p-2 border border-gray-300 rounded-md" />
      <input bind:value={newResource.type} placeholder="Resource Type" required class="w-full p-2 border border-gray-300 rounded-md" />
      <input bind:value={newResource.url} placeholder="Resource URL" required class="w-full p-2 border border-gray-300 rounded-md" />
      <textarea bind:value={newResource.content} placeholder="Resource Content" required class="w-full p-2 border border-gray-300 rounded-md"></textarea>
      <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Resource</button>
    </form>
  {/if}
</div>