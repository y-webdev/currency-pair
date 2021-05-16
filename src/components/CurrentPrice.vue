<template>
    <div>
        <div class="input-group mb-3">
            <span class="input-group-text">
                <i class="fab fa-fw fa-2x" :class="currencyIcon(currency)"></i>
            </span>
            <input type="number" class="form-control" v-model="amount">
        </div>
        <span class="fw-bold">{{ calcCurrency(data.data.amount, amount).toFixed(2) }} €</span>
        <hr>
    </div>
</template>

<script>
export default {
    props: ['data', 'currency'],
    data() {
      return {
          amount: 1
      }
    },
    methods: {
        calcCurrency(price, amount) {
            return parseFloat(price) * parseFloat(!amount ? 1 : amount);
        },
        currencyIcon(currency) {
            return currency === 'BTC' ? 'fa-bitcoin text-warning' : 'fa-ethereum text-primary'
        }
    }
}
</script>

<style scoped>
.input-group {
    max-width: 320px;
    margin: auto
}
</style>
