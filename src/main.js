import '@fortawesome/fontawesome-free/css/all.min.css'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from "@primevue/themes/aura";

import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

const app = createApp(App)
app.use(BootstrapVue3)
import vClickOutside from "click-outside-vue3";
app.use(vClickOutside);

import * as components from './components/component';
for (const key of Object.keys(components.default)) {
   app.component(key, components.default[key]);
}

app.use(router)
app.use(PrimeVue, {
   theme: {
      preset: Aura,
   },
})

app.mount('#app')
