<script lang="ts">
  export let items: any[] = [];
  export let columns: { key: string, label: string, render?: (item: any) => string }[] = [];
  export let onEdit: (item: any) => void;

  function handleEdit(item: any) {
    onEdit(item);
  }

  function formatDate(date: Date): string {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }
</script>

<div class="bg-gray-900">
  <div class="mx-auto max-w-7xl">
    <div class="bg-gray-900 py-10">
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-white">Items</h1>
            <p class="mt-2 text-sm text-gray-300">A list of all items.</p>
          </div>
        </div>
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table class="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    {#each columns as column}
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">{column.label}</th>
                    {/each}
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-800">
                  {#each items as item}
                    <tr>
                      {#each columns as column}
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-0">
                          {#if column.render}
                            {@html column.render(item)}
                          {:else if column.key === 'date'}
                            {formatDate(item[column.key])}
                          {:else}
                            {item[column.key]}
                          {/if}
                        </td>
                      {/each}
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-300 sm:pl-0">
                        <button
                          on:click={() => handleEdit(item)}
                          class="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
