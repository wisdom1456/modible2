<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { Skill } from '$lib/types';

  let skills: Skill[] = [];
  let newSkill: Skill = { id: '', name: '', category: '', level: 0 };

  onMount(async () => {
    skills = await knowledgeStore.getSkills();
  });

  function addSkill() {
    knowledgeStore.addSkill(newSkill);
    newSkill = { id: '', name: '', category: '', level: 0 };
  }

  function updateSkill(id: string, field: string, value: any) {
    knowledgeStore.updateSkill(id, { [field]: value });
  }

  function deleteSkill(id: string) {
    knowledgeStore.deleteSkill(id);
  }
</script>

<div class="skill-tracker">
  <h2>Skill Tracker</h2>

  <div class="add-skill">
    <input bind:value={newSkill.name} placeholder="Skill name" />
    <input bind:value={newSkill.category} placeholder="Category" />
    <input type="range" bind:value={newSkill.level} min="0" max="100" step="5" />
    <button on:click={addSkill}>Add Skill</button>
  </div>

  <div class="skills-list">
    {#each skills as skill}
      <div class="skill-item">
        <input
          bind:value={skill.name}
          on:change={() => updateSkill(skill.id, 'name', skill.name)}
        />
        <input
          bind:value={skill.category}
          on:change={() => updateSkill(skill.id, 'category', skill.category)}
        />
        <input
          type="range"
          bind:value={skill.level}
          on:change={() => updateSkill(skill.id, 'level', skill.level)}
          min="0" max="100" step="5"
        />
        <button on:click={() => deleteSkill(skill.id)}>Delete</button>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add styles for the skill tracker component */
</style>