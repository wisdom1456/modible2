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

<div class="knowledge-base p-4 bg-white rounded-lg shadow-md">
  <h2 class="text-2xl font-bold mb-4 text-gray-800">Knowledge Base</h2>

  <div class="add-note mb-4">
    <input bind:value={$newNote.title} placeholder="Note title" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    <textarea bind:value={$newNote.content} placeholder="Note content" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
    <input bind:value={$newNote.tags} placeholder="Tags (comma-separated)" class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    <button on:click={addNote} class="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Note</button>
  </div>

  <div class="notes">
    {#each $notes as note}
      <div class="note p-4 bg-white rounded-lg shadow-md mb-4">
        <h3 class="text-lg font-bold mb-2 text-gray-800">{note.title}</h3>
        <p class="text-gray-700">{note.content}</p>
        <p class="text-gray-600">Tags: {note.tags.join(', ')}</p>
        <button on:click={() => deleteNote(note.id)} class="mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">Delete</button>
      </div>
    {/each}
  </div>
</div>