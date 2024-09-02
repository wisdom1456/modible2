<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Navigation from "$lib/components/navigation/Navigation.svelte";
  import { userSettings } from '$lib/stores/userSettings';
</script>

<div class={$userSettings.theme}>
  <Navigation>
    <main>
      <slot />
    </main>
  </Navigation>
</div>

