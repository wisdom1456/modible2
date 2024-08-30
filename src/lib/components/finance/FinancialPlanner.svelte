<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { financeStore } from '$lib/stores/financeStore';
  import SectionNavigation from './SectionNavigation.svelte';
  import SectionContent from './SectionContent.svelte';
  import type { FinancialSummary, Transaction } from '$lib/types';

  let activeSection = writable('dashboard');
  let financialSummary: FinancialSummary | null = null;
  let transactions = writable<Transaction[]>([]);
  let transactionsTitle = writable('Transactions');

  onMount(async () => {
    financialSummary = await financeStore.getFinancialSummary();
    updateTransactions('dashboard');
  });

  function changeSection(section: string) {
    activeSection.set(section);
    updateTransactions(section);
  }

  async function updateTransactions(section: string) {
    const transactionData = await financeStore.getTransactions(section);
    transactions.set(transactionData);
  }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
  <SectionNavigation {changeSection} />
  <SectionContent {activeSection} financialSummary={financialSummary} />
</div>