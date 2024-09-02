<script lang="ts">
  export let items: { href: string; label: string }[];
  import { userSettings } from '$lib/stores/userSettings';
  import { onMount } from 'svelte';
  onMount(() => {
    userSettings.loadFromStorage();
  });
</script>

<nav class="flex flex-1 flex-col">
  <ul class="flex flex-1 flex-col gap-y-7">
    <li>
      <ul class="-mx-2 space-y-1">
        {#each items as item}
          <li>
            <a
              href={item.href}
              class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary hover:bg-primary hover:text-primary"
            >
              <svg
                class="h-6 w-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                />
              </svg>
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </li>
    <li>
      <div class="text-xs font-semibold leading-6 text-secondary">Your teams</div>
      <ul class="-mx-2 mt-2 space-y-1">
        <li>
          <button
            class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary hover:bg-primary hover:text-primary"
          >
            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary text-[0.625rem] font-medium text-secondary group-hover:text-primary"
              >P</span
            >
            <span class="truncate">Planetaria</span>
          </button>
        </li>
        <li>
          <button
            class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary hover:bg-primary hover:text-primary"
          >
            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary text-[0.625rem] font-medium text-secondary group-hover:text-primary"
              >P</span
            >
            <span class="truncate">Protocol</span>
          </button>
        </li>
        <li>
          <button
            class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-secondary hover:bg-primary hover:text-primary"
          >
            <span
              class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-secondary bg-primary text-[0.625rem] font-medium text-secondary group-hover:text-primary"
              >T</span
            >
            <span class="truncate">Tailwind Labs</span>
          </button>
        </li>
      </ul>
    </li>
    <li class="-mx-6 mt-auto">
      <a
        href="/settings"
        class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-primary hover:bg-primary"
      >
      <img src={$userSettings.image} alt="" class="h-8 w-8 rounded-full bg-secondary" />
      <span class="sr-only">Your profile</span>
      <span aria-hidden="true">{$userSettings.name}</span>
      </a>
    </li>
  </ul>
</nav>
