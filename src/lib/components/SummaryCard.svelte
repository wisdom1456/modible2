<script lang="ts">
  export let label: string;
  export let value: string | number;
</script>

<div class="bg-primary p-4 rounded-lg shadow">
  <h3 class="text-sm font-medium text-secondary">{label}</h3>
  <p class="mt-2 text-3xl font-semibold text-primary">{value}</p>
</div>