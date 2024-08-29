<script lang="ts">
  import { onMount } from 'svelte';
  import { knowledgeStore } from '$lib/stores/knowledgeStore';
  import type { KnowledgeNote } from '$lib/types';

  let notes: KnowledgeNote[] = [];
  let newNote: KnowledgeNote = { id: '', title: '', content: '', tags: [] };

  onMount(async () => {
    notes = await knowledgeStore.getKnowledgeNotes();
  });

  function addNote() {
    knowledgeStore.addKnowledgeNote(newNote);
    newNote = { id: '', title: '', content: '', tags: [] };
  }

  function updateNote(id: string, field: string, value: any) {
    knowledgeStore.updateKnowledgeNote(id, { [field]: value });
  }

  function deleteNote(id: string) {
    knowledgeStore.deleteKnowledgeNote(id);
  }
</script>

<div class="knowledge-base">
  <h2>Knowledge Base</h2>

  <div class="add-note">
    <input bind:value={newNote.title} placeholder="Note title" />
    <textarea bind:value={newNote.content} placeholder="Note content"></textarea>
    <input bind:value={newNote.tags} placeholder="Tags (comma-separated)" />
    <button on:click={addNote}>Add Note</button>
  </div>

  <div class="notes-list">
    {#each notes as note}
      <div class="note-item">
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <p>Tags: {note.tags.join(', ')}</p>
        <button on:click={() => deleteNote(note.id)}>Delete</button>
      </div>
    {/each}
  </div>
</div>

<style>
  /* Add styles for the knowledge base component */
</style>