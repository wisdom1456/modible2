<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { Project } from '$lib/types';

  let projects: Project[] = [];
  let newProject: Project = {
    id: '',
    name: '',
    description: '',
    tasks: []
  };

  onMount(async () => {
    projects = await taskStore.getProjects();
  });

  function addProject() {
    taskStore.addProject(newProject);
    newProject = { id: '', name: '', description: '', tasks: [] };
  }

  function updateProject(id: string, field: string, value: any) {
    taskStore.updateProject(id, field, value);
  }

  function deleteProject(id: string) {
    taskStore.deleteProject(id);
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Project Manager</h2>

  <div class="mb-4">
    <input bind:value={newProject.name} placeholder="Project name" class="w-full px-3 py-2 border rounded-md mb-2" />
    <textarea bind:value={newProject.description} placeholder="Description" class="w-full px-3 py-2 border rounded-md mb-2"></textarea>
    <button on:click={addProject} class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Project</button>
  </div>

  <div class="space-y-4">
    {#each projects as project}
      <div class="bg-gray-100 rounded-lg p-4">
        <input
          bind:value={project.name}
          on:change={() => updateProject(project.id, 'name', project.name)}
          class="w-full px-3 py-2 border rounded-md mb-2"
        />
        <textarea
          bind:value={project.description}
          on:change={() => updateProject(project.id, 'description', project.description)}
          class="w-full px-3 py-2 border rounded-md mb-2"
        ></textarea>
        <button on:click={() => deleteProject(project.id)} class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">Delete</button>
        <!-- Add task management within project -->
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add styles for the project manager component */
</style>