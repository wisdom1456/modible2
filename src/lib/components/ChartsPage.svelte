<script lang="ts">
  import { onMount } from 'svelte';
  import { financeStore } from '$lib/stores/financeStore';

  let charts: any[] = [];

  onMount(async () => {
    charts = await financeStore.getCharts();
  });

  function processChart(chart: any) {
    // Process chart
    return JSON.stringify(chart); // Temporary implementation
  }
</script>

<div class="charts-container">
  {#each charts as chart}
    <div>{@html processChart(chart)}</div>
  {/each}
</div>