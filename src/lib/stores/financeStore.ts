import { writable } from "svelte/store";
import type {
  BudgetCategory,
  Expense,
  Income,
  Investment,
  InvestmentRecommendation,
  FinancialGoal
} from "$lib/types";

interface FinanceStore {
  balance: number;
  categories: BudgetCategory[];
  expenses: Expense[];
  incomes: Income[];
  investments: Investment[];
  goals: FinancialGoal[];
}

const createFinanceStore = () => {
  const { subscribe, update } = writable<FinanceStore>({
    balance: 0,
    categories: [],
    expenses: [],
    incomes: [],
    investments: [],
    goals: []
  });

  return {
    subscribe,
    addExpense: (expense: Expense) => update(store => {
      store.expenses = [...store.expenses, expense];
      return store;
    }),
    deleteExpense: (id: string) => update(store => {
      store.expenses = store.expenses.filter(e => e.id !== id);
      return store;
    }),
    addIncome: (income: Income) => update(store => {
      store.incomes = [...store.incomes, income];
      return store;
    }),
    deleteIncome: (id: string) => update(store => {
      store.incomes = store.incomes.filter(i => i.id !== id);
      return store;
    }),
    getFinancialSummary: async () => {
      // Stub implementation
      return {
        balance: 0,
        categories: [],
        expenses: [],
        incomes: [],
        investments: [],
        goals: []
      };
    },
    getBudget: async () => {
      // Stub implementation
      return {
        categories: []
      };
    },
    addBudgetCategory: (category: BudgetCategory) => update(store => {
      store.categories = [...store.categories, category];
      return store;
    }),
    getExpenses: async () => {
      // Stub implementation
      return [];
    },
    getIncomes: async () => {
      // Stub implementation
      return [];
    },
    getInvestments: async () => {
      // Stub implementation
      return [];
    },
    getFinancialGoals: async () => {
      // Stub implementation
      return [];
    },
    addFinancialGoal: (goal: FinancialGoal) => update(store => {
      store.goals = [...store.goals, goal];
      return store;
    }),
    deleteFinancialGoal: (id: string) => update(store => {
      store.goals = store.goals.filter(g => g.id !== id);
      return store;
    })
  };
};

export const financeStore = createFinanceStore();
export const investmentsStore = writable<Investment[]>([]);
export const recommendationsStore = writable<InvestmentRecommendation[]>([]);
export const fetchFinancialSummary = financeStore.getFinancialSummary;
