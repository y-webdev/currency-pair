import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import VueApexCharts from "vue3-apexcharts/dist/vue3-apexcharts.common";

createApp(App)
    .use(router)
    .use(VueApexCharts)
    .mount('#app')
