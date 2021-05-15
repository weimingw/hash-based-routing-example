<script>
    import { onMount, onDestroy } from 'svelte';
    import data from '../data';

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
        window.dispatchEvent(
            new HashChangeEvent('hashchange', { oldURL: window.location.href, newURL: newLocation })
        );
    }

    let country;
    let date;
    let selectedData = [];
    function getData() {
        const params = getSearchParams();
        country = params.country || 'unitedStates';
        date = params.date || '17/05/2021';
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
                return;
            case 'cloudy':
                return;
            case 'partlyCloudy':
                return;
            default:
                return;
        }
    }

    function updateCountry(newCountry) {
        pushSearchParams({ country: newCountry, date });
    }

    function updateDate(newDate) {
        pushSearchParams({ country, date: newDate });
    }
</script>

<!-- Idea: Filter by US or Canada, display a page of all cities in the selected country, then click to filter by date -->
<div class="forecasts">
    <div class="countries">
        <p>Pick a country:</p>
        <a on:click={() => updateCountry('unitedStates')}>United States</a>
        <a on:click={() => updateCountry('canada')}>Canada</a>
    </div>
    <div class="dates">
        <p>Pick a day:</p>
        <a on:click={() => updateDate('17/05/2021')}>17 May 2021</a>
        <a on:click={() => updateDate('18/05/2021')}>18 May 2021</a>
        <a on:click={() => updateDate('19/05/2021')}>19 May 2021</a>
    </div>
    <h3>{data[country]}</h3>
    <div class="cities">
        {#each selectedData as city (city.key)}
            <div>
                <h5>{city.label}</h5>
                <div>{getIcon(city.icon)}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .forecasts {
        display: flex;
        flex-direction: column;
    }

    .countries {
        display: flex;
        margin: 0.3rem;
    }

    .countries > * {
        width: 12rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dates {
        display: flex;
        margin: 0.3rem;
    }

    .dates > * {
        width: 12rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
