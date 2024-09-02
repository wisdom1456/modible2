<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Navigation from "$lib/components/navigation/Navigation.svelte";
</script>

<div class="flex h-screen bg-gray-900">
  <Navigation>
    <main>
      <slot />
    </main>
  </Navigation>
</div>
