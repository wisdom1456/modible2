<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { Task } from '$lib/types';

  let tasks: Task[] = [];
  let newTask: Task = { id: '', title: '', description: '', dueDate: null, priority: 'medium', category: '' };

  onMount(async () => {
    tasks = await taskStore.getTasks();
  });

  function addTask() {
    taskStore.addTask(newTask);
    newTask = { id: '', title: '', description: '', dueDate: null, priority: 'medium', category: '' };
  }

  function deleteTask(id: string) {
    taskStore.deleteTask(id);
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="task-list-heading">
  <h2 id="task-list-heading" class="text-xl font-semibold mb-4 text-gray-700">Tasks</h2>
  <div class="space-y-4">
    {#each tasks as task}
      <div class="bg-gray-100 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-700">{task.title}</h3>
        <p class="text-gray-600 mt-2">{task.description}</p>
        <button on:click={() => deleteTask(task.id)} class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Delete</button>
      </div>
    {/each}
  </div>
</div>