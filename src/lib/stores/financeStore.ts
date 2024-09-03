import { writable } from 'svelte/store';
import type {
  Account,
  BudgetItem,
  Expense,
  Income,
  Transaction,
} from '$lib/types/finance';
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
const incomes = writable<Income[]>(
  loadFromLocalStorage<Income[]>('incomes') || [],
);
const expenses = writable<Expense[]>(
  loadFromLocalStorage<Expense[]>('expenses') || [],
);

accounts.subscribe((value) => saveToLocalStorage('accounts', value));
transactions.subscribe((value) => saveToLocalStorage('transactions', value));
budgetItems.subscribe((value) => saveToLocalStorage('budgetItems', value));
incomes.subscribe((value) => saveToLocalStorage('incomes', value));
expenses.subscribe((value) => saveToLocalStorage('expenses', value));

function addTransaction(transaction: Transaction) {
  transactions.update((items) => {
    return [...items, transaction];
  });
}

function updateTransaction(updatedTransaction: Transaction) {
  transactions.update((items) => {
    return items.map((item) =>
      item.id === updatedTransaction.id ? updatedTransaction : item,
    );
  });
}

function deleteTransaction(id: string) {
  transactions.update((items) => {
    return items.filter((item) => item.id !== id);
  });
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

export const incomesStore = {
  subscribe: incomes.subscribe,
  getIncomes: async () => {
    const fetchedIncomes = localStorageService.getIncomes();
    incomes.set(fetchedIncomes);
    return fetchedIncomes;
  },
  addIncome: async (income: Omit<Income, 'id'>) => {
    const newIncome: Income = { ...income, id: Date.now().toString() };
    incomes.update((current) => {
      const updated = [...current, newIncome];
      localStorageService.saveIncomes(updated);
      return updated;
    });
  },
  updateIncome: async (income: Income) => {
    incomes.update((current) => {
      const updated = current.map((i) => (i.id === income.id ? income : i));
      localStorageService.saveIncomes(updated);
      return updated;
    });
  },
  deleteIncome: async (id: string) => {
    incomes.update((current) => {
      const updated = current.filter((i) => i.id !== id);
      localStorageService.saveIncomes(updated);
      return updated;
    });
  },
};

export const expensesStore = {
  subscribe: expenses.subscribe,
  getExpenses: async () => {
    const fetchedExpenses = localStorageService.getExpenses();
    expenses.set(fetchedExpenses);
    return fetchedExpenses;
  },
  addExpense: async (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = { ...expense, id: Date.now().toString() };
    expenses.update((current) => {
      const updated = [...current, newExpense];
      localStorageService.saveExpenses(updated);
      return updated;
    });
  },
  updateExpense: async (expense: Expense) => {
    expenses.update((current) => {
      const updated = current.map((e) => (e.id === expense.id ? expense : e));
      localStorageService.saveExpenses(updated);
      return updated;
    });
  },
  deleteExpense: async (id: string) => {
    expenses.update((current) => {
      const updated = current.filter((e) => e.id !== id);
      localStorageService.saveExpenses(updated);
      return updated;
    });
  },
};
