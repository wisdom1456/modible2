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

<style>
  /* Tailwind classes will handle the styling */
</style>

<div>
  <button on:click={toggleCustomization} class="p-2 bg-blue-500 text-white rounded">
    {isCustomizing ? 'Save Layout' : 'Customize Dashboard'}
  </button>

  {#if isCustomizing}
    <div class="customization-panel">
      <button on:click={() => addWidget('HealthSummaryWidget')}>Add Health Summary</button>
      <button on:click={() => addWidget('FinanceSummaryWidget')}>Add Finance Summary</button>
      <button on:click={() => addWidget('TaskSummaryWidget')}>Add Task Summary</button>
      <button on:click={() => addWidget('KnowledgeSummaryWidget')}>Add Knowledge Summary</button>
      <button on:click={() => addWidget('AiInsightsWidget')}>Add AI Insights</button>
    </div>
  {/if}

  <div class="dashboard-widgets">
    {#each widgets as widget (widget.id)}
      <div class="widget">
        {#if widget.type === 'HealthSummaryWidget'}
          <HealthSummaryWidget />
        {:else if widget.type === 'FinanceSummaryWidget'}
          <FinanceSummaryWidget />
        {:else if widget.type === 'TaskSummaryWidget'}
          <TaskSummaryWidget />
        {:else if widget.type === 'KnowledgeSummaryWidget'}
          <KnowledgeSummaryWidget />
        {:else if widget.type === 'AiInsightsWidget'}
          <AiInsightsWidget />
        {/if}
        {#if isCustomizing}
          <button on:click={() => removeWidget(widget.id)} class="remove-widget">Remove</button>
        {/if}
      </div>
    {/each}
  </div>
</div>