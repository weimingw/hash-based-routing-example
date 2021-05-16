<script context="module">
    function getSearchParams() {
        const path = window.location.hash.split('?');
        return path.length > 1 ? new URLSearchParams(path[1]) : new URLSearchParams();
    }

    function getNewLocation(params) {
        const searchParamString = Object.entries(params)
            .filter((entry) => entry[1] != null)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        const basePath = window.location.hash.split('?')[0];
        return searchParamString.length ? `${basePath}?${searchParamString}` : basePath;
    }

    function pushSearchParams(params) {
        const newLocation = getNewLocation(params);
        history.pushState({}, '', newLocation);
    }
</script>

<script>
    import { onMount, onDestroy } from 'svelte';
    import { fade } from 'svelte/transition';
    import { link } from 'svelte-routing';
    import data from '../data';
    import sunny from '../assets/sunny.png';
    import cloudy from '../assets/cloudy.png';
    import rain from '../assets/rain.png';
    import partlyCloudy from '../assets/partlyCloudy.png';

    let country;
    let date;
    let selectedData = [];
    function getData() {
        const params = getSearchParams();
        country = params.get('country') || 'unitedStates';
        date = params.get('date') || '17/05/2021';
        selectedData = data[country].data.map((city) => {
            return { key: city.key, label: city.label, ...city.data[date] };
        });
    }

    onMount(() => {
        window.addEventListener('hashchange', getData);
        getData();
    });

    onDestroy(() => {
        window.removeEventListener('hashchange', getData);
    });

    function getIcon(icon) {
        switch (icon) {
            case 'rain':
                return rain;
            case 'cloudy':
                return cloudy;
            case 'partlyCloudy':
                return partlyCloudy;
            default:
                return sunny;
        }
    }
</script>

<!-- Idea: Filter by US or Canada, display a page of all cities in the selected country, then click to filter by date -->
<div class="forecasts">
    <div class="countries">
        <p>Pick a country:</p>
        <a
            use:link
            class:selected={country === 'unitedStates'}
            href={getNewLocation({ date, country: 'unitedStates' })}>United States</a
        >
        <a
            use:link
            class:selected={country === 'canada'}
            href={getNewLocation({ date, country: 'canada' })}>Canada</a
        >
    </div>
    <div class="dates">
        <p>Pick a day:</p>
        <a
            use:link
            class:selected={date === '17/05/2021'}
            href={getNewLocation({ date: '17/05/2021', country })}>17 May 2021</a
        >
        <a
            use:link
            class:selected={date === '18/05/2021'}
            href={getNewLocation({ date: '18/05/2021', country })}>18 May 2021</a
        >
        <a
            use:link
            class:selected={date === '19/05/2021'}
            href={getNewLocation({ date: '19/05/2021', country })}>19 May 2021</a
        >
    </div>
    <h3>{data[country] && data[country].label}</h3>
    <div class="cities-container">
        {#key country + date}
            <div
                in:fade={{ duration: 100, delay: 100 }}
                out:fade={{ duration: 100 }}
                class="cities"
            >
                {#each selectedData as city (city.key)}
                    <div>
                        <h5>{city.label}</h5>
                        <img src={getIcon(city.icon)} alt={city.icon} />
                    </div>
                {/each}
            </div>
        {/key}
    </div>
</div>

<style>
    .forecasts {
        display: flex;
        flex-direction: column;
    }

    .cities-container {
        display: relative;
    }

    .cities {
        position: absolute;
    }

    .countries {
        display: flex;
        margin: 0.3rem;
    }

    .countries > * {
        width: 13rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
    }

    .dates {
        display: flex;
        margin: 0.3rem;
    }

    .dates > * {
        width: 13rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
    }

    .cities {
        display: flex;
        align-items: stretch;
    }

    .cities > * {
        width: 24rem;
        height: 24rem;
    }

    @media screen and (max-width: 720px) {
        .cities {
            flex-direction: column;
        }
    }
</style>
