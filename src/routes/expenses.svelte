<script lang="ts">
  import { expenseTransactions } from '$lib/stores/derivedStores';
</script>

<ul>
  {#each $expenseTransactions as transaction}
    <li>{transaction.description} - {transaction.amount}</li>
  {/each}
</ul>