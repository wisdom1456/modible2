import { writable } from 'svelte/store';
import { saveToLocalStorage, loadFromLocalStorage } from '$lib/utils/localStorage';

const defaultSettings = {
  name: 'User',
  image: '/logo.png',
  theme: 'light',
  notifications: true
};

const initialSettings = loadFromLocalStorage<typeof defaultSettings>('userSettings') || defaultSettings;

function createUserSettingsStore() {
  const { subscribe, set, update } = writable(initialSettings);

  subscribe(value => saveToLocalStorage('userSettings', value));

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