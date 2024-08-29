<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { Task, Subtask } from '$lib/types';

  export let taskId: string;
  let task: Task | null = null;

  onMount(async () => {
    task = await taskStore.getTask(taskId);
  });

  function updateTask(updates: Partial<Task>) {
    if (task) {
      taskStore.updateTask(taskId, updates);
    }
  }

  function addSubtask(subtaskTitle: string) {
    if (task) {
      const newSubtask: Subtask = { id: Date.now().toString(), title: subtaskTitle, completed: false };
      taskStore.addSubtask(taskId, newSubtask as unknown as Task); // Cast to Task
    }
  }

  function deleteSubtask(subtaskId: string) {
    if (task) {
      taskStore.deleteSubtask(taskId, subtaskId);
    }
  }

  function completeSubtask(subtask: Subtask) {
    if (task && task.subtasks) {
      updateTask({ subtasks: task.subtasks.map(s => s.id === subtask.id ? { ...s, completed: true } : s) });
    }
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="task-detail-heading">
  <h2 id="task-detail-heading" class="text-xl font-semibold mb-4 text-gray-700">Task Detail</h2>
  <!-- Add your task detail content here -->
</div>