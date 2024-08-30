<script lang="ts">
  export let id: string;
  export let title: string;
  export let content: string;
</script>

<section id={id} class="mb-8">
  <h2 class="text-xl font-semibold mb-2">{title}</h2>
  <p class="text-gray-700">{content}</p>
</section>