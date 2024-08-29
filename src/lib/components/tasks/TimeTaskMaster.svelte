<script lang="ts">
  import { onMount } from 'svelte';
  import TaskList from './TaskList.svelte';
  import Calendar from './Calendar.svelte';
  import SmartScheduler from './SmartScheduler.svelte';
  import ProjectManager from './ProjectManager.svelte';
  import TimeTracker from './TimeTracker.svelte';
  import ProductivityAnalytics from './ProductivityAnalytics.svelte';
  import PomodoroTimer from './PomodoroTimer.svelte';
  import { taskStore } from '$lib/stores/taskStore';

  let activeSection = 'tasks';
  let upcomingTasks;
  let todaySchedule;

  onMount(async () => {
    upcomingTasks = await taskStore.getUpcomingTasks();
    todaySchedule = await taskStore.getTodaySchedule();
  });

  function changeSection(section: string) {
    activeSection = section;
  }
</script>

<div class="time-task-master">
  <h1>Time & Task Master</h1>
  
  <div class="summary">
    <!-- Display upcoming tasks and today's schedule -->
  </div>

  <nav class="task-nav">
    <button class:active={activeSection === 'tasks'} on:click={() => changeSection('tasks')}>Tasks</button>
    <button class:active={activeSection === 'calendar'} on:click={() => changeSection('calendar')}>Calendar</button>
    <button class:active={activeSection === 'projects'} on:click={() => changeSection('projects')}>Projects</button>
    <button class:active={activeSection === 'timeTracker'} on:click={() => changeSection('timeTracker')}>Time Tracker</button>
    <button class:active={activeSection === 'analytics'} on:click={() => changeSection('analytics')}>Analytics</button>
  </nav>

  <div class="task-content">
    {#if activeSection === 'tasks'}
      <TaskList />
    {:else if activeSection === 'calendar'}
      <Calendar />
    {:else if activeSection === 'projects'}
      <ProjectManager />
    {:else if activeSection === 'timeTracker'}
      <TimeTracker />
    {:else if activeSection === 'analytics'}
      <ProductivityAnalytics />
    {/if}
  </div>

  <PomodoroTimer />
</div>

<style>
  /* Add styles for the time & task master layout */
</style>