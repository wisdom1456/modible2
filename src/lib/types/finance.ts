export interface Income {
  id?: string;
  date: Date;
  amount: number;
  source: string;
  description: string;
}

// Define the Account type
export interface Account {
  id: string;
  name: string;
  balance: number;
}

// Define the BudgetItem type
export interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  category: string;
}

// Define the Transaction type
export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense';
  description: string;
}