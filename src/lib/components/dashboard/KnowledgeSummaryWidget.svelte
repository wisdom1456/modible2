<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { KnowledgeSummary } from '$lib/types';

  let knowledgeSummary: KnowledgeSummary = { completedCourses: 0 };
  onMount(() => {
    knowledgeStore.subscribe(value => {
      knowledgeSummary = value;
    });
  });

  $: knowledgeSummary = $knowledgeStore;
</script>

<style>
  /* Tailwind classes will handle the styling */
</style>

<div class="p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-xl font-semibold mb-4 text-gray-700">Knowledge Summary</h2>
  <p class="text-lg text-gray-600">Completed Courses: <span class="text-purple-600">{knowledgeSummary.completedCourses}</span></p>
  <!-- Add more knowledge summary details -->
</div>