<script lang="ts">
  import { userSettings } from '$lib/stores/userSettings';

  function toggleTheme() {
    userSettings.updateSetting('theme', $userSettings.theme === 'light' ? 'dark' : 'light');
    userSettings.saveToStorage();
  }
</script>

<div>
  <h2 class="text-lg font-medium text-primary">Theme</h2>
  <button on:click={toggleTheme} class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-accent-color hover:bg-accent-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-color">
    Switch to {$userSettings.theme === 'light' ? 'Dark' : 'Light'} Theme
  </button>
</div>