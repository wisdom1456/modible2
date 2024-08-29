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

<style>
  .profile-container {
    padding: 2rem;
    background: #f5f7fa;
    min-height: 100vh;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-group button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    background-color: #4CAF50;
    color: white;
  }
</style>

<div class="profile-container">
  <h1 class="text-2xl font-bold mb-4">User Profile</h1>
  <div class="form-group">
    <label>Email:</label>
    <input type="email" bind:value={user.email} />
  </div>
  <div class="form-group">
    <label>Password:</label>
    <input type="password" bind:value={user.password} />
  </div>
  <div class="form-group">
    <label>Currency:</label>
    <input type="text" bind:value={user.currency} />
  </div>
  <div class="form-group">
    <label>Time Zone:</label>
    <input type="text" bind:value={user.timeZone} />
  </div>
  <button on:click={signUp}>Sign Up</button>
  <button on:click={logIn}>Log In</button>
  <button on:click={updateProfile}>Update Profile</button>
</div>