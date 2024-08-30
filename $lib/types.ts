export interface KnowledgeSummary {
  completedCourses: number;
  // Add other properties as needed
}

export interface BudgetCategory {
  id: string;
  name: string;
  amount: number;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export interface HealthPlan {
  id: string;
  name: string;
  goals: HealthGoal[];
}

export interface HealthGoal {
  id: string;
  title: string;
  description: string;
  metric: string;
  target: number;
  currentValue: number;
  targetDate: Date;
}

export interface EmotionalHealthData {
  happinessLevel: number;
  anxietyLevel?: number;
  stressLevel?: number;
}

export interface FinancialProfile {
  name: string;
  email: string;
  // Add other properties as needed
}

export interface FinancialInsight {
  description: string;
  value: string | number;
}