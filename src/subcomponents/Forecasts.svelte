<script>
    import { onMount, onDestroy } from 'svelte';
    function getData() {

    }

    onMount(() => {
        window.addEventListener('hashchange', getData)
        getData();
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', getData)
    });
</script>

<!-- Idea: Filter by US or Canada, display a page of all cities in the selected country, then click to filter by date -->
<div>

</div>