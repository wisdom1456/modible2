<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { Project } from '$lib/types';

  let projects: Project[] = [];

  onMount(async () => {
    projects = await taskStore.getProjects();
  });

  async function updateProject(id: string, field: string, value: any) {
    await taskStore.updateProject(id, { [field]: value });
    projects = await taskStore.getProjects();
  }

  async function deleteProject(id: string) {
    await taskStore.deleteProject(id);
    projects = await taskStore.getProjects();
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-semibold mb-4 text-gray-800">Project Manager</h2>
  {#each projects as project}
    <div class="mb-4 p-4 bg-gray-100 rounded-lg">
      <h3 class="text-xl font-semibold mb-2">{project.name}</h3>
      <p class="mb-2">{project.description}</p>
      <button on:click={() => deleteProject(project.id)} class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
    </div>
  {/each}
</div>