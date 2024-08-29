<script lang="ts">
  import { onMount } from 'svelte';
  import DashboardWidget from './DashboardWidget.svelte';
  import HealthSummaryWidget from './HealthSummaryWidget.svelte';
  import FinanceSummaryWidget from './FinanceSummaryWidget.svelte';
  import TaskSummaryWidget from './TaskSummaryWidget.svelte';
  import KnowledgeSummaryWidget from './KnowledgeSummaryWidget.svelte';
  import AiInsightsWidget from './AiInsightsWidget.svelte';
  import { dashboardStore } from '$lib/stores/dashboardStore';

  interface Widget {
    type: string;
    id: number;
  }

  let widgets: Widget[] = [];
  let isCustomizing = false;

  onMount(() => {
    widgets = dashboardStore.getWidgets();
  });

  function toggleCustomization() {
    isCustomizing = !isCustomizing;
  }

  function saveLayout() {
    dashboardStore.saveLayout(widgets);
    isCustomizing = false;
  }

  function addWidget(type: string) {
    widgets = [...widgets, { type, id: Date.now() }];
  }

  function removeWidget(id: number) {
    widgets = widgets.filter(w => w.id !== id);
  }
</script>

<div class="p-6 bg-gray-100 min-h-screen">
  <h1 class="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
  
  <div class="mb-4">
    <button
      on:click={toggleCustomization}
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {isCustomizing ? 'Exit Customization' : 'Customize Dashboard'}
    </button>
    {#if isCustomizing}
      <button
        on:click={saveLayout}
        class="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Layout
      </button>
    {/if}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each widgets as widget (widget.id)}
      <DashboardWidget
        title={widget.type}
        {isCustomizing}
        on:remove={() => removeWidget(widget.id)}
      >
        {#if widget.type === 'Health Summary'}
          <HealthSummaryWidget />
        {:else if widget.type === 'Finance Summary'}
          <FinanceSummaryWidget />
        {:else if widget.type === 'Task Summary'}
          <TaskSummaryWidget />
        {:else if widget.type === 'Knowledge Summary'}
          <KnowledgeSummaryWidget />
        {:else if widget.type === 'AI Insights'}
          <AiInsightsWidget />
        {/if}
      </DashboardWidget>
    {/each}
  </div>

  {#if isCustomizing}
    <div class="mt-6 p-4 bg-white rounded shadow">
      <h2 class="text-xl font-semibold mb-4">Add Widgets</h2>
      <div class="flex flex-wrap gap-2">
        <button
          on:click={() => addWidget('Health Summary')}
          class="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
        >
          Add Health Summary
        </button>
        <button
          on:click={() => addWidget('Finance Summary')}
          class="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
        >
          Add Finance Summary
        </button>
        <!-- Add more buttons for other widget types -->
      </div>
    </div>
  {/if}
</div>