<script lang="ts">
  import { onMount } from 'svelte';
  import { wearableStore, getConnectedDevices, syncDeviceData } from '$lib/stores/wearableStore';
  import type { WearableDevice } from '$lib/types';

  let connectedDevices: WearableDevice[] = [];

  onMount(async () => {
    connectedDevices = await getConnectedDevices();
  });

  async function connectDevice() {
    // Implement device connection logic
  }

  async function syncData(deviceId: string) {
    await syncDeviceData(deviceId);
  }
</script>

<div class="wearable-integration">
  <h2>Wearable Devices</h2>
  
  <button on:click={connectDevice}>Connect New Device</button>

  {#each connectedDevices as device}
    <div class="device-card">
      <h3>{device.name}</h3>
      <p>Status: {device.status}</p>
      <button on:click={() => syncData(device.id)}>Sync Data</button>
    </div>
  {/each}
</div>

<style>
  /* Add styles for the wearable device integration component */
</style>