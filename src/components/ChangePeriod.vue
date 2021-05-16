<template>
    <div class="container row m-auto">
        <div class="col-4">
            <button class="btn btn-primary m-1" @click="setWeekMonthData(7)">Week</button>
        </div>
        <div class="col-4">
            <button class="btn btn-primary m-1" @click="setWeekMonthData(30)">Month</button>
        </div>
        <div class="col-4">
            <div class="form-group">
                <input class="form-control" type="date" @change="setPeriodData($event)">
            </div>
        </div>
    </div>
    <div v-if="!loading" class="fw-bold">{{calcPercentage(currentPrice, data.data.amount).toFixed(2)}}%</div>
    <hr>
</template>

<script>

import fetchData from "@/composable/fetchData";
import dayjs from "dayjs";
export default {
    props: ['currency', 'currentPrice'],
    data() {
      return {
          date: 7,
          data: {},
          loading: true,
          different: null
      }
    },
    mounted() {
        this.handleWeekMonth(7);
        this.setData(7)
    },
    methods: {
        setData() {
            const {data, loading, error} = fetchData(`${this.currency}-EUR/spot?date=${this.date}`)
            this.data = data;
            this.loading = loading;
        },
        handleWeekMonth(days) {
            const today = new Date();
            today.setDate(today.getDate() - days);
            this.date = dayjs(today, 'llll').format('YYYY-MM-DD')
        },
        setWeekMonthData(days) {
            this.handleWeekMonth(days);
            this.setData()
        },
        setPeriodData(event) {
            this.date = event.target.value;
            this.setData()
        },
        calcPercentage(currentPrice, oldPrice) {
            return (parseFloat(currentPrice) * 100 / parseFloat(oldPrice)) - 100
        }
    }
}
</script>

<style scoped>

</style>
