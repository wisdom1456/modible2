import type { Account, BudgetItem, Expense, Income, Transaction } from '$lib/types/finance';

const LOCAL_STORAGE_KEYS = {
  ACCOUNTS: 'accounts',
  TRANSACTIONS: 'transactions',
  BUDGET_ITEMS: 'budgetItems',
  INCOMES: 'incomes',
  EXPENSES: 'expenses'
};

export const localStorageService = {
  getAccounts: (): Account[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCOUNTS);
    return data ? JSON.parse(data) : [];
  },
  saveAccounts: (accounts: Account[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  },
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },
  saveTransactions: (transactions: Transaction[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },
  getBudgetItems: (): BudgetItem[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.BUDGET_ITEMS);
    return data ? JSON.parse(data) : [];
  },
  saveBudgetItems: (budgetItems: BudgetItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BUDGET_ITEMS, JSON.stringify(budgetItems));
  },
  getIncomes: (): Income[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.INCOMES);
    return data ? JSON.parse(data) : [];
  },
  saveIncomes: (incomes: Income[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.INCOMES, JSON.stringify(incomes));
  },
  getExpenses: (): Expense[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  },
  saveExpenses: (expenses: Expense[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }
};

export function saveToLocalStorage(key: string, data: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

export function loadFromLocalStorage<T>(key: string): T | null {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
  return null;
}