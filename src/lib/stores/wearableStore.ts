import { writable } from "svelte/store";
import type { WearableDevice } from "$lib/types";
import { saveToLocalStorage, loadFromLocalStorage } from "$lib/utils/localStorage";

const initialWearableState = loadFromLocalStorage<{ connectedDevices: WearableDevice[] }>('wearableStore') || {
  connectedDevices: [],
};

const wearableStore = writable(initialWearableState);

wearableStore.subscribe(value => saveToLocalStorage('wearableStore', value));

export const getConnectedDevices = async (): Promise<WearableDevice[]> => {
  // Implement logic to get connected devices
  return [];
};

export const syncDeviceData = async (deviceId: string): Promise<void> => {
  // Implement logic to sync device data
};

export { wearableStore };
