import type { Profile, Balance, Expense, SavingsGoal } from '../types';

export async function saveProfile(profile: Profile): Promise<Profile> {
  return await apiRequest<Profile>('/api/profile', 'POST', profile);
}

export async function saveBalance(balance: Balance): Promise<Balance> {
  return await apiRequest<Balance>('/api/balance', 'POST', balance);
}

export async function saveExpenses(expenses: Expense[]): Promise<Expense[]> {
  return await apiRequest<Expense[]>('/api/expenses', 'POST', expenses);
}

export async function saveSavingsGoals(
  goals: SavingsGoal[],
): Promise<SavingsGoal[]> {
  return await apiRequest<SavingsGoal[]>('/api/savings-goals', 'POST', goals);
}

async function apiRequest<T>(url: string, method: string, data: T): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

// Add more API functions for other steps
