<script lang="ts">
    import KnowledgeGrowthCenter from './KnowledgeGrowthCenter.svelte';
    import LearningResourceLibrary from './LearningResourceLibrary.svelte';
    import SkillTracker from './SkillTracker.svelte';
    import PersonalDevelopmentGoals from './PersonalDevelopmentGoals.svelte';
</script>

<style>
    /* Add your styles here */
</style>

<div class="knowledge-container">
    <h1 class="text-2xl font-bold mb-4">Knowledge Center</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KnowledgeGrowthCenter />
        <LearningResourceLibrary />
        <SkillTracker />
        <PersonalDevelopmentGoals />
    </div>
</div>