<script lang="ts">
  export let title: string;
</script>

<div class="layout">
  <header class="top-menu">
    <h1>{title}</h1>
    <!-- Add top menu items here -->
  </header>
  <nav class="submenu">
    <!-- Add submenu items here -->
  </nav>
  <main class="content">
    <slot></slot>
  </main>
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .top-menu {
    background-color: #333;
    color: white;
    padding: 1rem;
  }
  .submenu {
    background-color: #444;
    color: white;
    padding: 0.5rem;
  }
  .content {
    flex: 1;
    padding: 1rem;
    background-color: #f0f0f0;
  }
</style>