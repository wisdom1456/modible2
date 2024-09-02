<script lang="ts">
  interface PageData {
    title?: string;
    description?: string;
  }
  
  export let data: PageData;
</script>

<h1 class="text-2xl font-bold mb-4">{data.title || 'Section Title'}</h1>
<p class="text-gray-300 mb-4">{data.description || 'Section description'}</p>

<!-- Add section-specific content here -->