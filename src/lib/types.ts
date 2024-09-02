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
  id: string; // Add this line
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
  totalBalance: number; // Add this property
  monthlyIncome: number; // Add this property
  monthlyExpenses: number; // Add this property
  expenses: Expense[];
  incomes: Income[];
  investments: Investment[];
  goals: FinancialGoal[];
  categories: BudgetCategory[]; // Add this property
  dailyExpenses: Expense[]; // Add this property
  insights: FinancialInsight[]; // Add this property
}

export interface InvestmentRecommendation {
  id: string;
  description: string;
}

export interface HealthPlan {
  id: string;
  name: string;
  goals: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date | null;
  priority: "low" | "medium" | "high";
  category: string;
  subtasks?: Subtask[];
  status: string; // Add this property
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  description: string;
  startTime: Date;
  endTime: Date;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  description: string;
}

export interface ScheduleBlock {
  id: string;
  startTime: Date;
  endTime: Date;
  task: Task;
}

export interface KnowledgeNote {
  id: string;
  title: string;
  content: string;
  tags: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: string;
  url: string;
}

export interface PersonalDevelopmentGoal {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  progress: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface EmotionalHealthData {
  happinessLevel: number;
}

export interface MentalHealthData {
  stressLevel: number;
}

export interface PhysicalHealthData {
  weight: number;
}

export interface WearableDevice {
  id: string;
  name: string;
  status: string;
}

export interface SearchEventDetail {
  term: string;
  // Add any other properties that are part of the SearchEventDetail
}

export interface KnowledgeSummary {
  completedCourses: number;
  // Add other properties as needed
}

export interface BudgetItem {
  name: string;
  amount: number;
}

export interface UserProfile {
  name: string;
  email: string;
  currency: string;
}

// Add this interface
export interface Transaction {
  description: string;
  amount: number;
}

export interface FinancialProfile {
  name: string;
  email: string; // Add this field
  // Add other fields as necessary
}

export interface FinancialInsight {
  description: string;
  value: number | string; // Change to allow both number and string
}

export interface HealthGoal {
  title: string;
  description: string;
  metric: string;
  target: number | string;
  currentValue: number | string;
  targetDate: Date;
}

export type NavItem = {
  href: string;
  label: string;
};

export interface SectionSummary {
  [key: string]: { label: string; value: string | number };
}
