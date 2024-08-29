<script lang="ts">
  import { goto } from '$app/navigation';

  function navigateToSignUp() {
    goto('/profile');
  }

  function navigateToLogIn() {
    goto('/profile');
  }
</script>

<style>
  .landing-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
    min-height: 100vh;
  }

  .feature {
    margin: 1rem 0;
  }

  .cta-buttons {
    margin-top: 2rem;
  }

  .cta-buttons button {
    margin: 0 1rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
  }

  .sign-up {
    background-color: #4CAF50;
    color: white;
  }

  .log-in {
    background-color: #2196F3;
    color: white;
  }
</style>

<div class="landing-container">
  <h1 class="text-4xl font-bold mb-6">Welcome to Our App</h1>
  <p class="text-lg mb-6">Manage your finances, track your health, and achieve your goals with our all-in-one app.</p>
  <div class="features">
    <div class="feature">
      <img src="https://via.placeholder.com/300x200" alt="Feature 1" />
      <h2 class="text-xl font-semibold mt-2">Financial Management</h2>
      <p>Keep track of your income, expenses, and savings goals. Get insights into your financial health.</p>
    </div>
    <div class="feature">
      <img src="https://via.placeholder.com/300x200" alt="Feature 2" />
      <h2 class="text-xl font-semibold mt-2">Health Tracking</h2>
      <p>Monitor your physical, mental, and emotional health. Set goals and track your progress over time.</p>
    </div>
    <div class="feature">
      <img src="https://via.placeholder.com/300x200" alt="Feature 3" />
      <h2 class="text-xl font-semibold mt-2">Task Management</h2>
      <p>Stay organized with our powerful task management tools. Plan your day, week, and month efficiently.</p>
    </div>
    <div class="feature">
      <img src="https://via.placeholder.com/300x200" alt="Feature 4" />
      <h2 class="text-xl font-semibold mt-2">Knowledge Growth</h2>
      <p>Expand your knowledge with our learning resources. Track your progress and achieve your learning goals.</p>
    </div>
  </div>

  <div class="cta-buttons">
    <button class="sign-up" on:click={navigateToSignUp}>Sign Up</button>
    <button class="log-in" on:click={navigateToLogIn}>Log In</button>
  </div>
</div>