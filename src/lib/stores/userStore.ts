import { writable } from "svelte/store";

const user = writable({
  email: "",
  password: "",
  currency: "USD",
  timeZone: "UTC",
});

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
