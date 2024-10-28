import { writable } from 'svelte/store';
import type { Account, BudgetItem, Transaction } from '$lib/types/finance';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  localStorageService,
} from '$lib/utils/localStorage';

const accounts = writable<Account[]>(
  loadFromLocalStorage<Account[]>('accounts') || [],
);
const transactions = writable<Transaction[]>(
  loadFromLocalStorage<Transaction[]>('transactions') || [],
);
const budgetItems = writable<BudgetItem[]>(
  loadFromLocalStorage<BudgetItem[]>('budgetItems') || [],
);

accounts.subscribe((value) => saveToLocalStorage('accounts', value));
transactions.subscribe((value) => saveToLocalStorage('transactions', value));
budgetItems.subscribe((value) => saveToLocalStorage('budgetItems', value));

function addTransaction(transaction: Transaction) {
  transactions.update((items) => [...items, transaction]);
}

function updateTransaction(updatedTransaction: Transaction) {
  transactions.update((items) =>
    items.map((item) =>
      item.id === updatedTransaction.id ? updatedTransaction : item,
    ),
  );
}

function deleteTransaction(id: string) {
  transactions.update((items) => items.filter((item) => item.id !== id));
}

async function getTransactions(): Promise<Transaction[]> {
  const storedTransactions =
    loadFromLocalStorage<Transaction[]>('transactions');
  return storedTransactions || [];
}

export const accountsStore = {
  subscribe: accounts.subscribe,
  getAccounts: async () => {
    const fetchedAccounts = localStorageService.getAccounts();
    accounts.set(fetchedAccounts);
    return fetchedAccounts;
  },
  addAccount: async (account: Omit<Account, 'id'>) => {
    const newAccount: Account = { ...account, id: Date.now().toString() };
    accounts.update((current) => {
      const updated = [...current, newAccount];
      localStorageService.saveAccounts(updated);
      return updated;
    });
  },
  updateAccount: async (account: Account) => {
    accounts.update((current) => {
      const updated = current.map((a) => (a.id === account.id ? account : a));
      localStorageService.saveAccounts(updated);
      return updated;
    });
  },
  deleteAccount: async (id: string) => {
    accounts.update((current) => {
      const updated = current.filter((a) => a.id !== id);
      localStorageService.saveAccounts(updated);
      return updated;
    });
  },
};

export const transactionsStore = {
  subscribe: transactions.subscribe,
  addTransaction,
  addTransactions: (newTransactions: Transaction[]) => {
    transactions.update((items) => [...items, ...newTransactions]);
  },
  updateTransaction,
  deleteTransaction,
  getTransactions,
};

export const budgetStore = {
  subscribe: budgetItems.subscribe,
  getBudgetItems: async () => {
    const fetchedBudgetItems = localStorageService.getBudgetItems();
    budgetItems.set(fetchedBudgetItems);
    return fetchedBudgetItems;
  },
  addBudgetItem: async (item: Omit<BudgetItem, 'id'>) => {
    const newBudgetItem: BudgetItem = { ...item, id: Date.now().toString() };
    budgetItems.update((current) => {
      const updated = [...current, newBudgetItem];
      localStorageService.saveBudgetItems(updated);
      return updated;
    });
  },
  updateBudgetItem: async (item: BudgetItem) => {
    budgetItems.update((current) => {
      const updated = current.map((i) => (i.id === item.id ? item : i));
      localStorageService.saveBudgetItems(updated);
      return updated;
    });
  },
  deleteBudgetItem: async (id: string) => {
    budgetItems.update((current) => {
      const updated = current.filter((i) => i.id !== id);
      localStorageService.saveBudgetItems(updated);
      return updated;
    });
  },
};
