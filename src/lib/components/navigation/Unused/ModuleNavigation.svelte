<script lang="ts">
  export let items: { href: string; label: string }[];
</script>

<style>
  /* Tailwind classes will handle the styling */
</style>

<nav>
  {#each items as item}
    <a href={item.href} class="nav-item">{item.label}</a>
  {/each}
</nav>