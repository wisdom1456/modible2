<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { LearningResource } from '$lib/types';

  let resources: LearningResource[] = [];
  let newResource: LearningResource = { id: '', title: '', content: '', type: '', url: '', tags: [] };

  onMount(async () => {
    resources = await knowledgeStore.getLearningResources();
  });

  function addResource() {
    knowledgeStore.addLearningResource(newResource);
    newResource = { id: '', title: '', content: '', type: '', url: '', tags: [] };
  }

  function updateResource(id: string, field: string, value: any) {
    knowledgeStore.updateLearningResource(id, { [field]: value });
  }

  function deleteResource(id: string) {
    knowledgeStore.deleteLearningResource(id);
  }
</script>

<div class="learning-resource-library">
  <h2>Learning Resource Library</h2>

  <div class="add-resource">
    <input bind:value={newResource.title} placeholder="Resource title" />
    <select bind:value={newResource.type}>
      <option value="book">Book</option>
      <option value="course">Course</option>
      <option value="article">Article</option>
      <option value="video">Video</option>
    </select>
    <input bind:value={newResource.url} placeholder="URL" />
    <input bind:value={newResource.tags} placeholder="Tags (comma-separated)" />
    <button on:click={addResource}>Add Resource</button>
  </div>

  <div class="resource-list">
    {#each resources as resource}
      <div class="resource-item">
        <h3>{resource.title}</h3>
        <p>{resource.type}</p>
        <a href={resource.url} target="_blank" rel="noopener noreferrer">View Resource</a>
        <p>Tags: {resource.tags.join(', ')}</p>
        <button on:click={() => deleteResource(resource.id)}>Delete</button>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add styles for the learning resource library component */
</style>