<script lang="ts">
  import "../app.css";
  import { page } from "$app/stores";
  import Navigation from "$lib/components/navigation/Navigation.svelte";
</script>
<div class="flex h-screen bg-gray-900">
  <Navigation>
    <main class="flex-1 overflow-y-auto p-6">
      <slot />
    </main>
  </Navigation>
</div>

<Navigation/>
