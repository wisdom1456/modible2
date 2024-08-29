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
  allocation: number;
  value: number;
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
