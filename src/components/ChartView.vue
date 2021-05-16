<template>
    <h3>Chart</h3>
    <div class="form-group m-auto">
        <input class="form-control" type="date" @change="handlePeriod($event)">
    </div>
    <div v-if="!loading" class="example">
        <apexchart
            width="100%"
            height="350"
            type="area"
            :options="handleOptions(data)"
            :series="handleSeries(data)"
        ></apexchart>
    </div>
</template>

<script>
import fetchData from "@/composable/fetchData";
import dayjs from "dayjs";
import _ from "lodash";



export default {
    props: ['currency'],
    data() {
        return {
            loading: true,
            period: 'day',
            data: null,
        }
    },
    mounted() {
        this.setData()
    },
    methods: {
        setData() {
            const {data, loading, error} = fetchData(`${this.currency}-EUR/historic?period=${this.period}`)
            this.data = data;
            this.loading = loading;
        },
        handleDate(date) {
            return dayjs(date, 'llll').format('DD.MMM.YYYY HH:mm')
        },
        handlePeriod(event) {
            const today = Date.now();
            const difference = today - new Date(event.target.value).getTime();
            const daysBetween = difference / (1000 * 3600 * 24)

            switch (true) {
                case _.inRange(daysBetween, 0, 1):
                    this.period = 'day'
                    break;
                case _.inRange(daysBetween, 1, 30):
                    this.period = 'month'
                    break;
                case _.inRange(daysBetween, 31, 365):
                    this.period = 'year'
                    break;
            }

            this.setData()

        },
        handleOptions(data) {
            return {
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: "smooth"
                },
                xaxis: {
                    categories: data.data.prices.map(item => item.time),
                    type: 'datetime',
                },
                yaxis: {
                    labels: {
                        formatter: value => value.toFixed(2) + '€'
                    },
                    title: {
                        text: 'Price'
                    },
                },
                tooltip: {
                    fixed: {
                        enabled: false,
                            position: "topRight"
                    }
                }
            }
        },
        handleSeries(data) {
            return [
                {
                    name: this.currency,
                    data: data.data.prices.map(item => item.price)
                }
            ]
        }

    }
}
</script>

<style scoped>
.form-group {
    max-width: 320px
}
.example {
    max-width: 100%;
    margin: auto
}
</style>
