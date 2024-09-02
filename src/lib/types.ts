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
  status: string;
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
}

export interface KnowledgeSummary {
  completedCourses: number;
}

export interface UserProfile {
  name: string;
  email: string;
  currency: string;
}

export interface FinancialProfile {
  name: string;
  email: string;
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

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  type: 'income' | 'expense';
  description: string;
}

export interface FinancialSummary {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
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