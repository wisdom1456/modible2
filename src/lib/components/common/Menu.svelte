<script lang="ts">
  import { writable } from 'svelte/store';

  export const isMenuOpen = writable(false);

  export function toggleMenu() {
    isMenuOpen.update(n => !n);
  }

  export function closeMenu() {
    isMenuOpen.set(false);
  }
</script>

<style>
  /* Tailwind classes will handle the styling */
</style>

<div class="relative">
  <button on:click={toggleMenu} class="p-2 bg-blue-500 text-white rounded">
    Open Menu
  </button>

  <div class={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 {$isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <button on:click={closeMenu} class="absolute top-2 right-2 text-gray-700">x</button>
    <nav class="p-4">
      <ul class="space-y-4">
        <li><a href="#section1" class="text-gray-700 hover:text-blue-500">Section 1</a></li>
        <li><a href="#section2" class="text-gray-700 hover:text-blue-500">Section 2</a></li>
        <li><a href="#section3" class="text-gray-700 hover:text-blue-500">Section 3</a></li>
      </ul>
    </nav>
  </div>
</div>