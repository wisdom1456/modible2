<script lang="ts">
  import Layout from './Layout.svelte';
  export let data: any;
  export let form: any;
</script>

<Layout title="Error Page">
  <div class="error">
    <h1>Error</h1>
    <p>{data?.message || 'An unknown error occurred.'}</p>
    {#if form}
      <pre>{JSON.stringify(form, null, 2)}</pre>
    {/if}
  </div>
</Layout>

<style>
  .error {
    padding: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 0.25rem;
  }
</style>