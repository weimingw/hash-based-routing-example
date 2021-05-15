const unitedStatesData = [
    {
        key: 'sanFrancisco',
        label: 'San Francisco',
        data: {
            '17/05/2021': {
                temperature: 57,
                rainChance: 10,
                icon: 'partlyCloudy',
            },
            '18/05/2021': {
                temperature: 62,
                rainChance: 10,
                icon: 'cloudy',
            },
            '19/05/2021': {
                temperature: 62,
                rainChance: 10,
                icon: 'cloudy',
            },
        },
    },
    {
        key: 'seattle',
        label: 'Seattle',
        data: {
            '17/05/2021': {
                temperature: 65,
                rainChance: 10,
                icon: 'cloudy',
            },
            '18/05/2021': {
                temperature: 59,
                rainChance: 40,
                icon: 'rainy',
            },
            '19/05/2021': {
                temperature: 57,
                rainChance: 20,
                icon: 'cloudy',
            },
        },
    },
    {
        key: 'lasVegas',
        label: 'Las Vegas',
        data: {
            '17/05/2021': {
                temperature: 89,
                rainChance: 0,
                icon: 'cloudy',
            },
            '18/05/2021': {
                temperature: 96,
                rainChance: 0,
                icon: 'rainy',
            },
            '19/05/2021': {
                temperature: 91,
                rainChance: 0,
                icon: 'cloudy',
            },
        },
    },
];

const canadaData = [
    {
        key: 'toronto',
        label: 'Toronto',
        data: {
            '17/05/2021': {
                temperature: 64,
                rainChance: 10,
                icon: 'sunny',
            },
            '18/05/2021': {
                temperature: 67,
                rainChance: 10,
                icon: 'sunny',
            },
            '19/05/2021': {
                temperature: 66,
                rainChance: 20,
                icon: 'partlyCloudy',
            },
        },
    },
    {
        key: 'vancouver',
        label: 'Vancouver',
        data: {
            '17/05/2021': {
                temperature: 64,
                rainChance: 40,
                icon: 'rain',
            },
            '18/05/2021': {
                temperature: 59,
                rainChance: 50,
                icon: 'rain',
            },
            '19/05/2021': {
                temperature: 59,
                rainChance: 50,
                icon: 'rain',
            },
        },
    },
    {
        key: 'alberta',
        label: 'Alberta',
        data: {
            '17/05/2021': {
                temperature: 80,
                rainChance: 10,
                icon: 'cloudy',
            },
            '18/05/2021': {
                temperature: 72,
                rainChance: 10,
                icon: 'cloudy',
            },
            '19/05/2021': {
                temperature: 66,
                rainChance: 40,
                icon: 'rain',
            },
        },
    },
];

export default {
    unitedStates: { label: 'United States', data: unitedStatesData },
    canada: { label: 'Canada', data: canadaData },
};
