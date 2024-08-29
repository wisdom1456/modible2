<script lang="ts">
  import { onMount } from 'svelte';
  import { aiStore, getInsights } from '$lib/stores/aiStore';
  
  let insights: { id: string; text: string }[] = [];
  
  onMount(() => {
    // Fetch AI insights
    insights = getInsights();
  });
  
  function handleInsightAction(insightId: string, action: string) {
    // Implement action logic
  }
  
  function provideFeedback(insightId: string, isHelpful: boolean) {
    // Implement feedback logic
  }
</script>

<div class="ai-insights">
  {#each insights as insight}
    <div class="insight">
      <p>{insight.text}</p>
      <div class="insight-actions">
        <button on:click={() => handleInsightAction(insight.id, 'apply')}>Apply</button>
        <button on:click={() => handleInsightAction(insight.id, 'dismiss')}>Dismiss</button>
      </div>
      <div class="feedback">
        <button on:click={() => provideFeedback(insight.id, true)}>Helpful</button>
        <button on:click={() => provideFeedback(insight.id, false)}>Not Helpful</button>
      </div>
    </div>
  {/each}
</div>

<style>
  .ai-insights {
    display: flex;
    flex-direction: column;
  }
  .insight {
    margin-bottom: 1rem;
  }
  .insight-actions, .feedback {
    display: flex;
    gap: 0.5rem;
  }
</style>