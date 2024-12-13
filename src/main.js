import "./assets/main.css";

import "primeicons/primeicons.css";

import "@fontsource/poppins";
import "@fontsource/poppins/500.css";

import "@fontsource/roboto";
import "@fontsource/roboto/500.css";

import "vue-toastification/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router";
import { PrimeVue } from "@primevue/core";

const app = createApp(App);

app.use(createPinia());
app.use(PrimeVue);

app.use(Toast, {
  timeout: 1500,
});
app.use(router);

app.mount("#app");
