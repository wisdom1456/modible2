import { writable } from "svelte/store";
import type { WearableDevice } from "$lib/types";

const wearableStore = writable<{ connectedDevices: WearableDevice[] }>({
  connectedDevices: [],
});

export const getConnectedDevices = async (): Promise<WearableDevice[]> => {
  // Implement logic to get connected devices
  return [];
};

export const syncDeviceData = async (deviceId: string): Promise<void> => {
  // Implement logic to sync device data
};

export { wearableStore };
