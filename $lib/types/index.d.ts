export interface FinancialProfile {
  // Define the properties of FinancialProfile
}

export interface HealthGoal {
  title: string;
  description: string;
  metric: string;
  target: number;
  currentValue: number;
  targetDate: string;
}

export interface FinancialInsight {
  description: string;
  value: number;
  // Add other properties if needed
}