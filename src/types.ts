export interface Profile {
  email: string;
  password: string;
  currency: string;
  timezone: string;
}

export interface Balance {
  current: number;
  income: Income[];
}

export interface Income {
  source: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'annually';
}

export interface Expense {
  category: string;
  amount: number;
  frequency: 'weekly' | 'biweekly' | 'monthly' | 'annually';
}

export interface SavingsGoal {
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
}

export interface WalkthroughState {
  currentStep: number;
  profile: Profile;
  balance: Balance;
  expenses: Expense[];
  savingsGoals: SavingsGoal[];
}
