<script lang="ts">
    import ModuleNavigation from '$lib/components/navigation/ModuleNavigation.svelte';
    import Finance from '$lib/components/finance/Finance.svelte';

    const financeNavItems = [
        { href: '/finance', label: 'Overview' },
        { href: '/finance/budget', label: 'Budget' },
        { href: '/finance/expenses', label: 'Expenses' },
        { href: '/finance/investments', label: 'Investments' },
        { href: '/finance/goals', label: 'Financial Goals' },
    ];
</script>

<Finance />