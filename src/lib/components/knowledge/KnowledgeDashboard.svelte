<script lang="ts">
  import { page } from '$app/stores';
  import Overview from './Overview.svelte';
  import Library from './Library.svelte';
  import Courses from './Courses.svelte';
  import Skills from './Skills.svelte';
  import LearningGoals from './LearningGoals.svelte';

  $: currentPath = $page.url.pathname;
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  {#if currentPath === '/knowledge' || currentPath === '/knowledge/'}
    <Overview />
  {:else if currentPath === '/knowledge/library'}
    <Library />
  {:else if currentPath === '/knowledge/courses'}
    <Courses />
  {:else if currentPath === '/knowledge/skills'}
    <Skills />
  {:else if currentPath === '/knowledge/goals'}
    <LearningGoals />
  {:else}
    <p class="text-gray-800">Page not found: {currentPath}</p>
  {/if}
</div>