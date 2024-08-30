<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { KnowledgeNote } from '$lib/types';
  import { writable } from 'svelte/store';

  let notes = writable<KnowledgeNote[]>([]);
  let newNote = writable<KnowledgeNote>({ id: '', title: '', content: '', tags: [] });

  onMount(async () => {
    notes.set(await knowledgeStore.getKnowledgeNotes());
  });

  function addNote() {
    knowledgeStore.addKnowledgeNote($newNote);
    newNote.set({ id: '', title: '', content: '', tags: [] });
  }

  function updateNote(id: string, field: string, value: any) {
    knowledgeStore.updateKnowledgeNote(id, { [field]: value });
  }

  function deleteNote(id: string) {
    knowledgeStore.deleteKnowledgeNote(id);
  }
</script>

<style>
  /* Tailwind classes will handle the styling */
</style>

<div class="knowledge-base">
  <h2>Knowledge Base</h2>

  <div class="add-note">
    <input bind:value={$newNote.title} placeholder="Note title" />
    <textarea bind:value={$newNote.content} placeholder="Note content"></textarea>
    <input bind:value={$newNote.tags} placeholder="Tags (comma-separated)" />
    <button on:click={addNote}>Add Note</button>
  </div>

  <div class="notes">
    {#each $notes as note}
      <div class="note">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <p>Tags: {note.tags.join(', ')}</p>
        <button on:click={() => deleteNote(note.id)}>Delete</button>
      </div>
    {/each}
  </div>
</div>