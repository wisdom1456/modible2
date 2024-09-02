import { writable } from 'svelte/store';
import type { Account, BudgetItem, Expense, Income, Transaction } from '$lib/types/finance';
import { localStorageService } from '$lib/utils/localStorage';

const accounts = writable<Account[]>(localStorageService.getAccounts());
const transactions = writable<Transaction[]>(localStorageService.getTransactions());
const budgetItems = writable<BudgetItem[]>(localStorageService.getBudgetItems());
const incomes = writable<Income[]>(localStorageService.getIncomes());
const expenses = writable<Expense[]>(localStorageService.getExpenses());

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
  }
};

export const transactionsStore = {
  subscribe: transactions.subscribe,
  getTransactions: async () => {
    const fetchedTransactions = localStorageService.getTransactions();
    transactions.set(fetchedTransactions);
    return fetchedTransactions;
  },
  addTransaction: async (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = { ...transaction, id: Date.now().toString() };
    transactions.update((current) => {
      const updated = [...current, newTransaction];
      localStorageService.saveTransactions(updated);
      return updated;
    });
  },
  updateTransaction: async (transaction: Transaction) => {
    transactions.update((current) => {
      const updated = current.map((t) => (t.id === transaction.id ? transaction : t));
      localStorageService.saveTransactions(updated);
      return updated;
    });
  },
  deleteTransaction: async (id: string) => {
    transactions.update((current) => {
      const updated = current.filter((t) => t.id !== id);
      localStorageService.saveTransactions(updated);
      return updated;
    });
  }
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
  }
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
  }
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
  }
};
