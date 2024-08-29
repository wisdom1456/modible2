<script lang="ts">
  export let module: string;
  export let items: { href: string; label: string }[];

  import { page } from '$app/stores';
</script>

<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <h2 class="text-2xl font-bold text-gray-800">{module}</h2>
        </div>
        <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
          {#each items as item}
            <a
              href={item.href}
              class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              class:border-indigo-500={$page.url.pathname === item.href}
              class:text-indigo-600={$page.url.pathname === item.href}
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</nav>