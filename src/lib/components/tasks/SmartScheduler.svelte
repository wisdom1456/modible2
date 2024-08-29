<script lang="ts">
  import { onMount } from 'svelte';
  import { taskStore } from '$lib/stores/taskStore';
  import type { ScheduleBlock } from '$lib/types';

  let schedule: ScheduleBlock[] = [];

  onMount(async () => {
    schedule = await taskStore.generateSmartSchedule();
  });

  async function regenerateSchedule() {
    schedule = await taskStore.generateSmartSchedule();
  }

  function updateScheduleBlock(id: string, changes: Partial<ScheduleBlock>) {
    taskStore.updateScheduleBlock(id, changes);
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Smart Scheduler</h2>

  <button on:click={regenerateSchedule} class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4">Regenerate Schedule</button>

  <div class="space-y-4">
    {#each schedule as block}
      <div class="bg-gray-100 rounded-lg p-4">
        <span class="block text-gray-700 mb-2">{block.startTime} - {block.endTime}</span>
        <input
          bind:value={block.task}
          on:change={() => updateScheduleBlock(block.id, { task: block.task })}
          class="w-full px-3 py-2 border rounded-md"
        />
        <!-- Add more editable fields as needed -->
      </div>
    {/each}
  </div>
</div>