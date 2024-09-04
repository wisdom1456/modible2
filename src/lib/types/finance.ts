export interface Budget {
  categories: BudgetItem[];
}

export interface BudgetItem {
  id: string;
  name: string;
  budgeted: number;
  totalSpent: number;
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
  transactions: Transaction[];
  investments: Investment[];
  goals: FinancialGoal[];
  categories: BudgetItem[];
  dailyExpenses: Transaction[];
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

export interface Transaction {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
  type: 'income' | 'expense';
}

export interface FinancialInsight {
  description: string;
  value: number | string;
}

export interface Account {
  id: string;
  name: string;
  balance: number;
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}
