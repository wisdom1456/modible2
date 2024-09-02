import { writable } from 'svelte/store';

const defaultSettings = {
  name: 'User',
  image: '/logo.png',
  theme: 'light',
  notifications: true
};

function createUserSettingsStore() {
  const { subscribe, set, update } = writable(defaultSettings);

  return {
    subscribe,
    updateSetting: (key: keyof typeof defaultSettings, value: any) => update(s => ({ ...s, [key]: value })),
    loadFromStorage: () => {
      const stored = localStorage.getItem('userSettings');
      if (stored) set(JSON.parse(stored));
    },
    saveToStorage: () => {
      subscribe(value => {
        localStorage.setItem('userSettings', JSON.stringify(value));
      })();
    }
  };
}

export const userSettings = createUserSettingsStore();