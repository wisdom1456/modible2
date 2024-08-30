<script lang="ts">
  export let changeSection: (section: string) => void;
</script>

<style>
  .section-nav {
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: #edf2f7;
  }

  .section-nav button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #2d3748;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .section-nav button:hover {
    background-color: #4a5568;
  }
</style>

<nav class="section-nav">
  <button on:click={() => changeSection('overview')}>Overview</button>
  <button on:click={() => changeSection('tracker')}>Health Tracker</button>
  <button on:click={() => changeSection('goals')}>Health Goals</button>
</nav>