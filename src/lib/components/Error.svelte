<script lang="ts">
  export let message: string;
</script>

<div class="error">
  <h1>Error</h1>
  <p>{message || 'An unknown error occurred.'}</p>
</div>

<style>
  .error {
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 0.25rem;
  }
</style>