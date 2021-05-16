<script>
    import uniqueId from 'lodash';
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Router from 'svelte-spa-router';
    import Forecasts from './subcomponents/Forecasts.svelte';
    import LandingPage from './subcomponents/LandingPage.svelte';

    // to highlight the selected page
    let selectedPage = '';
    let notifications = [];
    function setSelectedPage() {
        selectedPage = '/' + window.location.hash.split('?')[0];
    }
    function addNotification(message) {
        const id = uniqueId();
        notifications = [...notifications, { id, text: message }];
        setTimeout(
            () => (notifications = notifications.filter((notification) => notification.id !== id)),
            3000
        );
    }
    function notifyHashChange() {
        addNotification('Triggered hashchange event!');
    }
    function notifyPopState() {
        addNotification('Triggered popstate event!');
    }

    onMount(() => {
        // run it once on load
        setSelectedPage();
        window.addEventListener('hashchange', setSelectedPage);
        window.addEventListener('hashchange', notifyHashChange);
        window.addEventListener('popstate', notifyPopState);
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', setSelectedPage);
        window.removeEventListener('hashchange', notifyHashChange);
        window.removeEventListener('popstate', notifyPopState);
    });
</script>

<div class="app">
    <div class="notifications">
        {#each [...notifications].reverse() as notification (notification.id)}
            <div animate:flip transition:fade>{notification.text}</div>
        {/each}
    </div>
    <div class="pages header">
        <a class="link" class:selected={selectedPage === '/#/'} href="/#/">Home</a>
        <a class="link" class:selected={selectedPage === '/#/forecast'} href="/#/forecast"
            >Forecasts</a
        >
    </div>
    <div class="content">
        <Router
            routes={{
                '/': LandingPage,
                '/forecast': Forecasts,
            }}
        />
    </div>
    <div class="footer">
        <a href="https://www.freepik.com/vectors/icons">
            Icons vector created by anindyanfitri - www.freepik.com
        </a>
    </div>
</div>

<style>
    .app {
        padding: 1rem;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }

    .content {
        flex-grow: 1;
    }

    .pages {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 1rem;
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
    }

    .notifications {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
    }

    .notifications > * {
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        background: #2A628F;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }

    .footer > a{
        padding: 0.5rem 1rem;
    }
</style>
