<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { PersonalDevelopmentGoal } from '$lib/types';

  let goals: PersonalDevelopmentGoal[] = [];
  let newGoal: PersonalDevelopmentGoal = { id: '', title: '', description: '', dueDate: new Date(), progress: 0 };

  onMount(async () => {
    goals = await knowledgeStore.getPersonalDevelopmentGoals();
  });

  function addGoal() {
    knowledgeStore.addPersonalDevelopmentGoal(newGoal);
    newGoal = { id: '', title: '', description: '', dueDate: new Date(), progress: 0 };
  }

  function updateGoal(id: string, field: string, value: any) {
    knowledgeStore.updatePersonalDevelopmentGoal(id, { [field]: value });
  }

  function deleteGoal(id: string) {
    knowledgeStore.deletePersonalDevelopmentGoal(id);
  }
</script>

<div class="personal-development-goals">
  <h2>Personal Development Goals</h2>

  <div class="add-goal">
    <input bind:value={newGoal.title} placeholder="Goal title" />
    <textarea bind:value={newGoal.description} placeholder="Goal description"></textarea>
    <input type="date" bind:value={newGoal.dueDate} />
    <input type="range" bind:value={newGoal.progress} min="0" max="100" step="5" />
    <button on:click={addGoal}>Add Goal</button>
  </div>

  <div class="goals-list">
    {#each goals as goal}
      <div class="goal-item">
        <input
          bind:value={goal.title}
          on:change={() => updateGoal(goal.id, 'title', goal.title)}
        />
        <textarea
          bind:value={goal.description}
          on:change={() => updateGoal(goal.id, 'description', goal.description)}
        ></textarea>
        <input
          type="date"
          bind:value={goal.dueDate}
          on:change={() => updateGoal(goal.id, 'dueDate', goal.dueDate)}
        />
        <input
          type="range"
          bind:value={goal.progress}
          on:change={() => updateGoal(goal.id, 'progress', goal.progress)}
          min="0" max="100" step="5"
        />
        <button on:click={() => deleteGoal(goal.id)}>Delete</button>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add styles for the personal development goals component */
</style>