export interface Budget {
  categories: BudgetCategory[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
}

export interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
}

export interface Income {
  id: string;
  date: Date;
  amount: number;
  source: string;
  description: string;
}

export interface Investment {
  id: string;
  name: string;
  value: number;
  allocation: number;
}

export interface FinancialGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
}

export interface FinancialSummary {
  balance: number;
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  expenses: Expense[];
  incomes: Income[];
  investments: Investment[];
  goals: FinancialGoal[];
  categories: BudgetCategory[];
  dailyExpenses: Expense[];
  insights: FinancialInsight[];
}

export interface InvestmentRecommendation {
  id: string;
  description: string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
}

export interface FinancialInsight {
  description: string;
  value: number | string;
}