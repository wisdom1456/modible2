import { derived } from 'svelte/store';
import { transactionsStore } from './financeStore';
import type { Transaction } from '$lib/types';

export const incomeTransactions = derived(transactionsStore, ($transactions) =>
  $transactions.filter((transaction: Transaction) => transaction.type === 'income')
);

export const expenseTransactions = derived(transactionsStore, ($transactions) =>
  $transactions.filter((transaction: Transaction) => transaction.type === 'expense')
);