<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';

  let taskSummary = { pendingTasks: 0 };

  onMount(async () => {
    taskSummary = taskStore.getTaskSummary();
  });

  $: taskSummary = taskStore.getTaskSummary();
</script>

<style>
  /* Tailwind classes will handle the styling */
</style>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Task Summary</h2>
  <p class="text-lg text-gray-600">Pending Tasks: <span class="text-green-600">{taskSummary.pendingTasks}</span></p>
  <!-- Add more task summary details -->
</div>