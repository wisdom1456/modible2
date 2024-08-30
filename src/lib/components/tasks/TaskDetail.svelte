<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { Task, Subtask } from '$lib/types';

  export let taskId: string;

  let task: Task | null = null;
  let subtasks: Subtask[] = [];

  onMount(async () => {
    task = await taskStore.getTask(taskId);
    subtasks = await taskStore.getSubtasks(taskId);
  });

  async function toggleSubtask(subtaskId: string) {
    await taskStore.toggleSubtask(taskId, subtaskId);
    subtasks = await taskStore.getSubtasks(taskId);
  }
</script>

<div class="task-detail p-4 bg-white rounded-lg shadow-md">
  {#if task}
    <h2 class="text-2xl font-bold mb-4">{task.title}</h2>
    <p class="mb-4">{task.description}</p>
    <p class="mb-4">Due: {task.dueDate ? task.dueDate.toLocaleDateString() : 'No due date'}</p>
    <p class="mb-4">Priority: {task.priority}</p>
    <h3 class="text-xl font-semibold mb-2">Subtasks</h3>
    <ul class="space-y-2">
      {#each subtasks as subtask}
        <li class="flex items-center">
          <input type="checkbox" checked={subtask.completed} on:change={() => toggleSubtask(subtask.id)} class="mr-2" />
          <span class:line-through={subtask.completed}>{subtask.title}</span>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Loading task...</p>
  {/if}
</div>