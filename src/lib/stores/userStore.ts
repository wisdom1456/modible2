import { writable } from 'svelte/store';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '$lib/utils/localStorage';

const initialUser = loadFromLocalStorage('user') || {
  email: '',
  password: '',
  currency: 'USD',
  timeZone: 'UTC',
};

const user = writable(initialUser);

user.subscribe((value) => saveToLocalStorage('user', value));

export const userStore = {
  subscribe: user.subscribe,
  signUp: (userData) => {
    // Implement sign-up logic
    user.set(userData);
  },
  logIn: (userData) => {
    // Implement log-in logic
    user.set(userData);
  },
  updateProfile: (userData) => {
    // Implement profile update logic
    user.update((current) => ({ ...current, ...userData }));
  },
};
