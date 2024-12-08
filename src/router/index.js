import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/tutor/DashboardView.vue";
import ProfilView from "@/views/tutor/profil/ProfilView.vue";
import EditProfilView from "@/views/tutor/profil/edit/EditProfilView.vue";
import LihatModelView from "@/views/tutor/model/lihat/LihatModelView.vue";
import CreateModelView from "@/views/tutor/model/create/CreateModelView.vue";
import EditModelView from "@/views/tutor/model/edit/EditModelView.vue";
import IdEditModelView from "@/views/tutor/model/edit/id/IdEditModelView.vue";
import DeleteModelView from "@/views/tutor/model/delete/DeleteModelView.vue";
import SoalView from "@/views/tutor/soal/SoalView.vue";
import SoalModelView from "@/views/tutor/soal/model/SoalModelView.vue";
import CreateSoalView from "@/views/tutor/soal/create/CreateSoalView.vue";

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
    {
      path: "/tutor/dashboard",
      name: "tutor-dashboard",
      component: DashboardView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/profil",
      name: "tutor-profil",
      component: ProfilView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/profil/edit",
      name: "tutor-profil-edit",
      component: EditProfilView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/model",
      name: "tutor-model",
      component: LihatModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/model/create",
      name: "tutor-model-create",
      component: CreateModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/model/edit",
      name: "tutor-model-edit",
      component: EditModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/model/edit/:id",
      name: "tutor-model-edit-id",
      component: IdEditModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/model/delete",
      name: "tutor-model-delete",
      component: DeleteModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal",
      name: "tutor-soal",
      component: SoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/:idModel",
      name: "tutor-soal-idModel",
      component: SoalModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/create",
      name: "tutor-soal-create",
      component: CreateSoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
  ],
});

export default router;
