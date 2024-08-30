<script lang="ts">
  import { walkthroughState, nextStep, prevStep } from '../stores/walkthroughStore';
  import { validateStep1 } from '../utils/validation';
  import * as api from '../services/api';

  const steps = [
    'Setting Up Your Profile',
    'Enter Your Current Balance',
    'Set Up Your Expenses',
    'Add Your Savings Goals',
    'Start Tracking Your Spending',
    'Monitor Your Progress',
    'Fine-Tune and Optimize'
  ];

  // Define the type for the errors object
  type Errors = {
    api?: string;
    email?: string;
    password?: string;
    currency?: string;
    timezone?: string;
  };

  let errors: Errors = {};

  async function handleSubmit() {
    errors = validateStep1($walkthroughState.profile);
    if (Object.keys(errors).length === 0) {
      try {
        await api.saveProfile($walkthroughState.profile);
        nextStep();
      } catch (error) {
        errors.api = 'Failed to save profile';
      }
    }
  }
</script>

<div class="budget-walkthrough" role="region" aria-label="Budget Setup Walkthrough">
  <h2 id="walkthrough-title">Budget Setup Walkthrough</h2>
  
  {#each steps as step, index}
    {#if $walkthroughState.currentStep === index}
      <div class="step" role="tabpanel" aria-labelledby="step-{index + 1}">
        <h3 id="step-{index + 1}">Step {index + 1}: {step}</h3>
        {#if index === 0}
          <form on:submit|preventDefault={handleSubmit} novalidate>
            <label for="email">
              Email:
              <input type="email" id="email" bind:value={$walkthroughState.profile.email} required aria-invalid={errors.email ? 'true' : 'false'}>
              {#if errors.email}<span class="error" role="alert">{errors.email}</span>{/if}
            </label>
            <!-- Similar updates for password, currency, and timezone fields -->
            <button type="submit">Save and Continue</button>
          </form>
        {:else}
          <p>Content for step {index + 1} goes here.</p>
        {/if}
      </div>
    {/if}
  {/each}

  <div class="progress-bar" role="progressbar" aria-valuenow={$walkthroughState.currentStep + 1} aria-valuemin="1" aria-valuemax={steps.length}>
    {#each steps as step, i}
      <div class="step-indicator" class:active={$walkthroughState.currentStep >= i}></div>
    {/each}
  </div>

  <div class="navigation">
    <button on:click={prevStep} disabled={$walkthroughState.currentStep === 0}>Previous</button>
    <button on:click={nextStep} disabled={$walkthroughState.currentStep === steps.length - 1}>Next</button>
  </div>
</div>

<style>
  .budget-walkthrough {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  label {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-top: 5px;
    padding: 5px;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  .error {
    color: red;
    font-size: 0.8em;
  }
</style>