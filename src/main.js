import '@fortawesome/fontawesome-free/css/all.min.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from "@primevue/themes/aura";
import { createPinia } from 'pinia'

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import store from "./store/index";
import axios from "./store/axios";
import vClickOutside from "click-outside-vue3";
import * as components from './components/component';
import "./plugins/vee-validate";

const app = createApp(App)
app.use(BootstrapVue3)
app.use(vClickOutside);

for (const key of Object.keys(components.default)) {
   app.component(key, components.default[key]);
}
// Pinia
const pinia = createPinia()
app.use(pinia)

//set global axios
app.config.globalProperties.$axios = axios;

app.use(router)
app.use(PrimeVue, {
   theme: {
      preset: Aura,
   },
})

// use store
app.use(store);

app.mount('#app')
