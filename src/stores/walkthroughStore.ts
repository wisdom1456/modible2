import { writable } from 'svelte/store';
import type { WalkthroughState } from '../types';

const initialState: WalkthroughState = {
  currentStep: 0,
  profile: { email: '', password: '', currency: 'USD', timezone: 'UTC' },
  balance: { current: 0, income: [] },
  expenses: [],
  savingsGoals: [],
};

export const walkthroughState = writable<WalkthroughState>(initialState);

export function nextStep() {
  walkthroughState.update(state => ({
    ...state,
    currentStep: Math.min(state.currentStep + 1, 6)
  }));
}

export function prevStep() {
  walkthroughState.update(state => ({
    ...state,
    currentStep: Math.max(state.currentStep - 1, 0)
  }));
}

export function updateField<K extends keyof WalkthroughState>(
  field: K,
  value: WalkthroughState[K]
) {
  walkthroughState.update(state => ({ ...state, [field]: value }));
}