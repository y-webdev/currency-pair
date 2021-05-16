<template>
    <div v-if="!loading" class="home">
        <current-price :data="data" :currency="currency"/>
        <change-period :currency="currency" :currentPrice="data.data.amount"/>
        <period-table :currency="currency"/>
        <chart-view :currency="currency"/>
    </div>
</template>

<script>
import fetchData from "@/composable/fetchData";
import CurrentPrice from '@/components/CurrentPrice.vue'
import ChangePeriod from "@/components/ChangePeriod";
import PeriodTable from "@/components/PeriodTable";
import ChartView from "@/components/ChartView";
import dayjs from "dayjs";

export default {
    props: ['currency'],
    data() {
        return {
            data: {},
            loading: true,
        }
    },
    methods: {
        setData() {
            const currentDate = dayjs(new Date(), 'llll').format('YYYY-MM-DD');
            const {data, loading, error} = fetchData(`${this.currency}-EUR/spot?date=${currentDate}`)
            this.data = data;
            this.loading = loading;
        },
    },
    mounted() {
        this.setData()
    },
    components: {
        CurrentPrice,
        ChangePeriod,
        PeriodTable,
        ChartView
    }
}
</script>
