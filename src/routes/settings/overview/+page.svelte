<script lang="ts">
  import { userSettings } from '$lib/stores/userSettings';

  function toggleTheme() {
    userSettings.updateSetting('theme', $userSettings.theme === 'light' ? 'dark' : 'light');
    userSettings.saveToStorage();
  }
</script>

<h1 class="text-2xl font-bold mb-4 text-primary">Settings Overview</h1>
<p class="text-secondary mb-4">Get an overview of your account settings.</p>

<div class="p-4 bg-secondary rounded-lg shadow">
  <h2 class="text-xl font-bold text-primary">Account Overview</h2>
  <p class="mt-2 text-secondary">A summary of your account settings will be displayed here.</p>
</div>

<div class="mt-4">
  <h2 class="text-lg font-medium text-primary">Theme</h2>
  <button on:click={toggleTheme} class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-accent-color hover:bg-accent-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-color">
    Switch to {$userSettings.theme === 'light' ? 'Dark' : 'Light'} Theme
  </button>
</div>