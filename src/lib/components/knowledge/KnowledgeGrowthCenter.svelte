<script lang="ts">
  import { onMount } from 'svelte';
  import SkillTracker from './SkillTracker.svelte';
  import LearningResourceLibrary from './LearningResourceLibrary.svelte';
  import PersonalDevelopmentGoals from './PersonalDevelopmentGoals.svelte';
  import KnowledgeBase from './KnowledgeBase.svelte';
  import LearningPathCreator from './LearningPathCreator.svelte';
  import ProgressDashboard from './ProgressDashboard.svelte';
  import ReflectionJournal from './ReflectionJournal.svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';

  let activeSection = 'dashboard';
  let learningProgress;
  let upcomingGoals;

  onMount(async () => {
    learningProgress = await knowledgeStore.getLearningProgress();
    upcomingGoals = await knowledgeStore.getUpcomingGoals();
  });

  function changeSection(section: string) {
    activeSection = section;
  }
</script>

<div class="knowledge-growth-center">
  <h1>Knowledge & Growth Center</h1>
  
  <nav>
    <button class:active={activeSection === 'dashboard'} on:click={() => changeSection('dashboard')}>Dashboard</button>
    <button class:active={activeSection === 'skills'} on:click={() => changeSection('skills')}>Skills</button>
    <button class:active={activeSection === 'resources'} on:click={() => changeSection('resources')}>Resources</button>
    <button class:active={activeSection === 'goals'} on:click={() => changeSection('goals')}>Goals</button>
    <button class:active={activeSection === 'knowledge-base'} on:click={() => changeSection('knowledge-base')}>Knowledge Base</button>
    <button class:active={activeSection === 'learning-paths'} on:click={() => changeSection('learning-paths')}>Learning Paths</button>
    <button class:active={activeSection === 'journal'} on:click={() => changeSection('journal')}>Journal</button>
  </nav>

  <div class="knowledge-content">
    {#if activeSection === 'dashboard'}
      <ProgressDashboard />
    {:else if activeSection === 'skills'}
      <SkillTracker />
    {:else if activeSection === 'resources'}
      <LearningResourceLibrary />
    {:else if activeSection === 'goals'}
      <PersonalDevelopmentGoals />
    {:else if activeSection === 'knowledge-base'}
      <KnowledgeBase />
    {:else if activeSection === 'learning-paths'}
      <LearningPathCreator />
    {:else if activeSection === 'journal'}
      <ReflectionJournal />
    {/if}
  </div>
</div>

<style>
  /* Add styles for the knowledge & growth center layout */
</style>