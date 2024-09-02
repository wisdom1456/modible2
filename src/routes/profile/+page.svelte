<script lang="ts">
  import { onMount } from 'svelte';
  import { userStore } from '$lib/stores/userStore';

  let user = { email: '', password: '', currency: 'USD', timeZone: 'UTC' };

  function signUp() {
    userStore.signUp(user);
  }

  function logIn() {
    userStore.logIn(user);
  }

  function updateProfile() {
    userStore.updateProfile(user);
  }
</script>

<div class="p-8 bg-gray-100 min-h-screen">
  <h1 class="text-2xl font-bold mb-4">User Profile</h1>
  <div class="mb-4">
    <label for="email" class="block mb-2">Email:</label>
    <input id="email" type="email" bind:value={user.email} class="w-full p-2 border border-gray-300 rounded" />
  </div>
  <div class="mb-4">
    <label for="password" class="block mb-2">Password:</label>
    <input id="password" type="password" bind:value={user.password} class="w-full p-2 border border-gray-300 rounded" />
  </div>
  <div class="mb-4">
    <label for="currency" class="block mb-2">Currency:</label>
    <input id="currency" type="text" bind:value={user.currency} class="w-full p-2 border border-gray-300 rounded" />
  </div>
  <div class="mb-4">
    <label for="timeZone" class="block mb-2">Time Zone:</label>
    <input id="timeZone" type="text" bind:value={user.timeZone} class="w-full p-2 border border-gray-300 rounded" />
  </div>
  <button on:click={signUp} class="mt-4 px-4 py-2 bg-green-500 text-white rounded">Sign Up</button>
  <button on:click={logIn} class="mt-4 ml-2 px-4 py-2 bg-blue-500 text-white rounded">Log In</button>
  <button on:click={updateProfile} class="mt-4 ml-2 px-4 py-2 bg-yellow-500 text-white rounded">Update Profile</button>
</div>