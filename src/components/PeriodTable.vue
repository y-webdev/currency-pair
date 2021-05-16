<template>
    <h3>History</h3>
    <div class="form-group m-auto">
        <input class="form-control" type="date" @change="handlePeriod($event)">
    </div>
    <div v-if="!loading">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in data.data.prices.slice(0, 20)">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ handleDate(item.time) }}</td>
                <td>{{ item.price }} €</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fetchData from "@/composable/fetchData";
import dayjs from "dayjs";
import _ from 'lodash'

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

        }

    }
}
</script>

<style scoped>
.form-group {
    max-width: 320px;
}
</style>
