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
import IdSoalView from "@/views/tutor/soal/model/id/IdSoalView.vue";
import EditSoalView from "@/views/tutor/soal/edit/EditSoalView.vue";
import EditSoalModelView from "@/views/tutor/soal/edit/model/EditSoalModelView.vue";
import IdEditSoalView from "@/views/tutor/soal/edit/id/IdEditSoalView.vue";
import DeleteSoalView from "@/views/tutor/soal/delete/DeleteSoalView.vue";
import DeleteSoalModelView from "@/views/tutor/soal/delete/model/DeleteSoalModelView.vue";
import AdminDashboardView from "@/views/admin/AdminDashboardView.vue";
import DeleteSubjectView from "@/views/admin/subject/delete/DeleteSubjectView.vue";
import UpdateSubjectView from "@/views/admin/subject/update/UpdateSubjectView.vue";
import CreateSubjectView from "@/views/admin/subject/create/CreateSubjectView.vue";
import SubjectView from "@/views/admin/subject/read/SubjectView.vue";
import UserView from "@/views/admin/user/read/UserView.vue";
import UpdateUserView from "@/views/admin/user/update/UpdateUserView.vue";
import IdSubjectView from "@/views/admin/subject/update/id/IdSubjectView.vue";
import IdUpdateUserView from "@/views/admin/user/update/id/IdUpdateUserView.vue";
import IdUserView from "@/views/admin/user/read/id/IdUserView.vue";
import UserProfilView from "@/views/user/profil/UserProfilView.vue";
import UserUpdateView from "@/views/user/profil/update/UserUpdateView.vue";
import UjianView from "@/views/user/ujian/UjianView.vue";
import IdUjianView from "@/views/user/ujian/id/IdUjianView.vue";
import UjianFinishView from "@/views/user/ujian/finish/UjianFinishView.vue";
import NilaiSiswaView from "@/views/admin/nilai-siswa/NilaiSiswaView.vue";
import NilaiSiswaSubjectView from "@/views/admin/nilai-siswa/subject/NilaiSiswaSubjectView.vue";
import TutorNilaiSiswaView from "@/views/tutor/nilai-siswa/TutorNilaiSiswaView.vue";
import UserNilaiSiswaView from "@/views/user/nilai-siswa/UserNilaiSiswaView.vue";
import UserNIlaiSubjectView from "@/views/user/nilai-siswa/subject/UserNIlaiSubjectView.vue";

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
      path: "/tutor/soal/:namaModel/:idModel",
      name: "tutor-soal-idModel",
      component: SoalModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/:namaModel/:idModel/:noSoal/:idSoal",
      name: "tutor-soal-idModel-idSoal",
      component: IdSoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/create",
      name: "tutor-soal-create",
      component: CreateSoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/edit",
      name: "tutor-soal-edit",
      component: EditSoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/edit/:namaModel/:idModel",
      name: "tutor-soal-edit-namaModel-idModel",
      component: EditSoalModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/edit/:namaModel/:idModel/:noSoal/:idSoal",
      name: "tutor-soal-edit-namaModel-idModel-noSoal-idSoal",
      component: IdEditSoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/delete",
      name: "tutor-soal-delete",
      component: DeleteSoalView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/soal/delete/:namaModel/:idModel",
      name: "tutor-soal-delete-namaModel-idModel",
      component: DeleteSoalModelView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: AdminDashboardView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/subject",
      name: "admin-subject",
      component: SubjectView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/subject/create",
      name: "admin-subject-create",
      component: CreateSubjectView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/subject/edit",
      name: "admin-subject-edit",
      component: UpdateSubjectView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/subject/edit/:namaSubject/:idSubject",
      name: "admin-subject-edit-namaSubject-idSubject",
      component: IdSubjectView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/subject/delete",
      name: "admin-subject-delete",
      component: DeleteSubjectView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/user",
      name: "admin-user",
      component: UserView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/user/:id",
      name: "admin-user-id",
      component: IdUserView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/user/edit",
      name: "admin-user-edit",
      component: UpdateUserView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/user/edit/:idUser",
      name: "admin-user-edit-idUser",
      component: IdUpdateUserView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/profil",
      name: "admin-profil",
      component: ProfilView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/profil/edit",
      name: "admin-profil-edit",
      component: EditProfilView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/profil",
      name: "profil",
      component: UserProfilView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
    {
      path: "/profil/edit",
      name: "profil-edit",
      component: UserUpdateView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
    {
      path: "/ujian",
      name: "ujian",
      component: UjianView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
    {
      path: "/ujian/:namaSubject",
      name: "ujian-namaSubject",
      component: IdUjianView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
    {
      path: "/ujian/:namaSubject/finish/:idFinish",
      name: "ujian-namaSubject-finish-idFinish",
      component: UjianFinishView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
    {
      path: "/admin/nilai-siswa",
      name: "admin-nilai-siswa",
      component: NilaiSiswaView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/admin/nilai-siswa/:nama",
      name: "admin-nilai-siswa-nama",
      component: NilaiSiswaSubjectView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/tutor/nilai-siswa",
      name: "tutor-nilai-siswa",
      component: TutorNilaiSiswaView,
      meta: { requiresNav: true, requiresSideBar: true },
    },
    {
      path: "/histori",
      name: "histori",
      component: UserNilaiSiswaView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
    {
      path: "/histori/:nama",
      name: "histori-nama",
      component: UserNIlaiSubjectView,
      meta: { requiresNav: true, requiresSideBar: false },
    },
  ],
});

export default router;
