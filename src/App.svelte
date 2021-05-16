<script>
    import HashBased from './hash/HashBased.svelte';
    import Normal from './normal/Normal.svelte';

    let useHashBased = true;
    function onCheckboxChange(e) {
        useHashBased = e.target.checked;
    }
</script>

<div class="app">
    <label>
        <input type="checkbox" checked={useHashBased} on:change={onCheckboxChange} />
        <span>Use hash based routing</span>
    </label>
    {#if useHashBased}
        <HashBased />
    {:else}
        <Normal />
    {/if}
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .app > label {
        padding: 0.5rem;
    }

    .app > :global(*:nth-child(2)) {
        flex-grow: 1;
    }
</style>
