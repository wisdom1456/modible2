<script lang="ts">
  export let label: string;
  export let value: string | number;
</script>

<div class="rounded-lg bg-gray-800 p-4">
  <p class="text-sm font-medium text-gray-400">{label}</p>
  <p class="mt-2 text-3xl font-semibold text-white">{value}</p>
</div>