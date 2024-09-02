<script lang="ts">
    import SectionNavigation from './SectionNavigation.svelte';
    import Budget from './Budget.svelte';
    import Expenses from './Expenses.svelte';
    import Income from './Income.svelte';
    import Transactions from './Transactions.svelte';
    import Accounts from './Accounts.svelte';
    import Overview from './Overview.svelte';
    
    let currentSection = 'dashboard';

    function changeSection(section: string) {
        currentSection = section;
    }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
    <SectionNavigation {changeSection} />
    <div class="mt-4">
        {#if currentSection === 'overview'}
            <Overview />
        {:else if currentSection === 'budget'}
            <Budget />
        {:else if currentSection === 'expenses'}
            <Expenses />
        {:else if currentSection === 'income'}
            <Income />
        {:else if currentSection === 'transactions'}
            <Transactions />
        {:else if currentSection === 'accounts'}
            <Accounts />
        {/if}
    </div>
</div>