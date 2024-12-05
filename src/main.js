import "./assets/main.css";

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

const app = createApp(App);

app.use(Toast, {
  timeout: 1500,
});
app.use(createPinia());
app.use(router);

app.mount("#app");
