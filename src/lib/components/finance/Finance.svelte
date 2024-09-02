<script lang="ts">
    import SectionNavigation from './SectionNavigation.svelte';
    import Dashboard from './Dashboard.svelte';
    import Budget from './Budget.svelte';
    import Expenses from './Expenses.svelte';
    import Income from './Income.svelte';
    import Investments from './Investments.svelte';
    import Goals from './Goals.svelte';
    import Profile from './Profile.svelte';

    let currentSection = 'dashboard';

    function changeSection(section: string) {
        currentSection = section;
    }
</script>

<div class="p-4 bg-white rounded-lg shadow-md">
    <SectionNavigation {changeSection} />
    <div class="mt-4">
        {#if currentSection === 'dashboard'}
            <Dashboard />
        {:else if currentSection === 'budget'}
            <Budget />
        {:else if currentSection === 'expenses'}
            <Expenses />
        {:else if currentSection === 'income'}
            <Income />
        {:else if currentSection === 'investments'}
            <Investments />
        {:else if currentSection === 'goals'}
            <Goals />
        {:else if currentSection === 'profile'}
            <Profile />
        {/if}
    </div>
</div>