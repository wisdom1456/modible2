import type { Income } from '$lib/types/finance';

const API_BASE_URL = '/api/incomes';

export async function fetchIncomes(
  page: number = 1,
  limit: number = 10,
): Promise<{ incomes: Income[]; totalPages: number }> {
  const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch incomes');
  }
  return response.json();
}

export async function addIncome(income: Omit<Income, 'id'>): Promise<Income> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(income),
  });
  if (!response.ok) {
    throw new Error('Failed to add income');
  }
  return response.json();
}
