<script lang="ts">
  import { incomeTransactions } from '$lib/stores/derivedStores';
</script>

<ul>
  {#each $incomeTransactions as transaction}
    <li>{transaction.description} - {transaction.amount}</li>
  {/each}
</ul>