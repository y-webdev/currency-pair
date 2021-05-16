import {ref} from 'vue';

const fetchData = (query) => {
    const data = ref(null)
    const loading = ref(true)
    const error = ref(null)

    const load = async () => {
        loading.value = true;

        const response = await fetch(process.env.VUE_APP_API_COINBASE + query);

        try {
            if (!response.ok) {
                throw Error('No data available')
            }

            data.value = await response.json();

        } catch (err) {
            error.value = err.message;
        }

        loading.value = false;
    }

    (async () => {
        await load();
    })();

    return {data, loading, error}
}

export default fetchData;
