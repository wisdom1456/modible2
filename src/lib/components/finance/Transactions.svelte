<script lang="ts">
  import { onMount } from 'svelte';
  import Papa from 'papaparse';
  import type { Transaction } from '$lib/types';
  import { transactionsStore } from '$lib/stores/financeStore';
  import List from '$lib/components/common/List.svelte';
  import Spinner from '$lib/components/common/Spinner.svelte';
  import ErrorComponent from '$lib/components/Error.svelte';
  import AddEditTransactionModal from './AddEditTransactionModal.svelte';
  import { writable } from 'svelte/store';

  const transactions = writable<Transaction[]>([]);
  const isLoading = writable(false);
  const error = writable<string | null>(null);
  const showModal = writable(false);
  const currentTransaction = writable<Transaction | null>(null);

  async function loadTransactions() {
    isLoading.set(true);
    error.set(null);
    try {
      const data = await transactionsStore.getTransactions();
      transactions.set(data);
    } catch (e) {
      error.set(e instanceof Error ? e.message : 'Failed to fetch transactions');
    } finally {
      isLoading.set(false);
    }
  }

  function handleAdd() {
    currentTransaction.set(null);
    showModal.set(true);
  }

  function handleEdit(transaction: Transaction) {
    console.log('Editing transaction:', transaction);
    currentTransaction.set(transaction);
    showModal.set(true);
  }

  function handleCloseModal() {
    showModal.set(false);
    currentTransaction.set(null);
    loadTransactions();
  }

  function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result as string;
        parseCSVData(csvData);
      };
      reader.readAsText(file);
    }
  }

  function parseCSVData(csvData: string) {
    const parseConfig: Papa.ParserConfig = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: (header: string): string => header.trim(),
    };

    const result: Papa.ParseResult<any> = Papa.parse(csvData, parseConfig);

    if (result.errors.length) {
      console.error('Parsing errors:', result.errors);
      error.set('Failed to parse CSV file.');
      return;
    }

    const newTransactions: Transaction[] = result.data.map((row: any) => {
      const amount: number = row.Amount ?? 0;
      const dateStr: string = row.Date;
      const [month, day, year] = dateStr.split('/').map((part) => parseInt(part, 10));

      const date = new Date(year, month - 1, day);
      const type: Transaction['type'] = amount < 0 ? 'expense' : 'income';

      return {
        id: `${Date.now()}-${Math.random()}`,
        name: row.Description || 'Unnamed Transaction',
        description: row.Description || '',
        amount: Math.abs(amount),
        date,
        category: '',
        type,
      };
    });

    transactionsStore.addTransactions(newTransactions);
    loadTransactions();
  }

  onMount(loadTransactions);
</script>

<div
  class="p-4 bg-gray-900 rounded-lg shadow-md"
  role="region"
  aria-labelledby="transactions-heading"
>
  <h2 id="transactions-heading" class="text-2xl font-bold mb-4 text-white">
    Transactions
  </h2>

  <button
    on:click={handleAdd}
    class="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
  >
    Add Transaction
  </button>

  {#if $isLoading}
    <div class="flex justify-center items-center h-32">
      <Spinner size="w-8 h-8" />
    </div>
  {:else if $error}
    <ErrorComponent message={$error} />
  {:else}
    <List
      items={$transactions}
      columns={[
        { key: 'date', label: 'Date' },
        { key: 'amount', label: 'Amount' },
        { key: 'type', label: 'Type' },
        { key: 'description', label: 'Description' },
      ]}
      onEdit={handleEdit}
    />
  {/if}

  {#if $showModal}
    {#key $currentTransaction ? $currentTransaction.id : 'new'}
      <AddEditTransactionModal
        currentTransaction={$currentTransaction}
        on:close={handleCloseModal}
      />
    {/key}
  {/if}

  <!-- File input for CSV upload -->
  <div class="mb-4">
    <label for="csv-upload" class="block text-sm font-medium text-white">
      Import Transactions from CSV
    </label>
    <input
      id="csv-upload"
      type="file"
      accept=".csv"
      on:change={handleFileUpload}
      class="mt-1 block w-full text-white bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  </div>
</div>
