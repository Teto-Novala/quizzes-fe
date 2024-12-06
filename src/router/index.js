import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresNav: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresNav: false },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: { requiresNav: false },
    },
  ],
});

export default router;
