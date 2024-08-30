<script lang="ts">
  let tasks = [];
  let isLoading = false;
  let error = null;

  async function loadTasks() {
    isLoading = true;
    error = null;
    try {
      // Implement logic to load tasks
      tasks = [ /* mock data */ ];
    } catch (e) {
      error = e.message;
    } finally {
      isLoading = false;
    }
  }

  loadTasks();
</script>

<div class="task-list p-4 bg-white rounded-lg shadow-md" role="region" aria-labelledby="task-list-heading">
  <h2 id="task-list-heading" class="text-2xl font-bold mb-4 text-gray-800">Task List</h2>
  {#if isLoading}
    <p class="text-gray-600">Loading tasks...</p>
  {:else if error}
    <p class="text-red-500" role="alert">Error: {error}</p>
  {:else if tasks.length > 0}
    <ul class="space-y-2">
      {#each tasks as task}
        <li class="bg-gray-100 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-gray-800">{task.title}</h3>
          <p class="text-gray-600">{task.description}</p>
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-gray-600">No tasks found.</p>
  {/if}
</div>