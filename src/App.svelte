<script>
    import { onMount, onDestroy } from 'svelte';
    import Router from 'svelte-spa-router';
    import Forecasts from './subcomponents/Forecasts.svelte';
    import LandingPage from './subcomponents/LandingPage.svelte';

    let selectedPage = '';
    function setSelectedPage() {
        selectedPage = '/' + window.location.hash.split('?')[0];
    }    
    onMount(() => {
        // run it once on load
        setSelectedPage();
        window.addEventListener('hashchange', setSelectedPage)
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', setSelectedPage)
    });
</script>

<div>
    <div class='pages'>
        <a class='link' class:selected={selectedPage === '/#/'} href='/#/'>Home</a>
        <a class='link' class:selected={selectedPage === '/#/forecast'} href='/#/forecast'>Forecasts</a>
    </div>
    <Router routes={{
        '/': LandingPage,
        '/forecast': Forecasts,
    }} />
</div>

<style>
    .pages {
        display: flex;
        align-items: center;
        position: relative;
    }

    .pages > * {
        width: 13rem;
        height: 4rem;
        font-size: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
        border-radius: 0.5rem;
        transition: background 0.25s;
    }

    .pages > .selected {
        background: #C1D1EB;
    }
</style>