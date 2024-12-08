<template>
  <aside class="w-1/5 md:w-1/4 bg-primary font-primary h-auto py-3">
    <!-- tablet start -->
    <div
      v-if="isTutor"
      class="xl:hidden w-full flex flex-col text-center"
    >
      <div
        @click="modelHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2">Model</p>
        <img
          :src="`/src/assets/images/${isModelShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isModelShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/tutor/model"
          class="hover:bg-white w-full text-center py-2"
          >Lihat Model</RouterLink
        >
        <RouterLink
          to="/tutor/model/create"
          class="hover:bg-white w-full text-center py-2"
          >Buat Model</RouterLink
        >
        <RouterLink
          to="/tutor/model/edit"
          class="hover:bg-white w-full text-center py-2"
          >Edit Model</RouterLink
        >
        <RouterLink
          to="/tutor/model/delete"
          class="hover:bg-white w-full text-center py-2"
          >hapus Model</RouterLink
        >
      </div>
      <div
        @click="soalHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2">Soal</p>
        <img
          :src="`/src/assets/images/${isSoalShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isSoalShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/tutor/soal"
          class="hover:bg-white w-full text-center py-1"
          >Lihat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/soal/create"
          class="hover:bg-white w-full text-center py-1"
          >Buat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/soal/edit"
          class="hover:bg-white w-full text-center py-1"
          >Edit Soal</RouterLink
        >
        <RouterLink
          to="/tutor/soal/delete"
          class="hover:bg-white w-full text-center py-1"
          >hapus Soal</RouterLink
        >
      </div>
      <RouterLink
        to="/tutor/nilai-siswa"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all"
        >Nilai Siswa</RouterLink
      >
      <RouterLink
        to="/tutor/profil"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all"
        >Profil</RouterLink
      >
    </div>
    <div
      v-if="isAdmin"
      class="xl:hidden w-full flex flex-col text-center"
    >
      <div
        @click="subjectHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2">Subject</p>
        <img
          :src="`/src/assets/images/${isSubjectShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isSubjectShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/admin/subject"
          class="hover:bg-white w-full text-center py-2"
          >Lihat Subject</RouterLink
        >
        <RouterLink
          to="/admin/subject/create"
          class="hover:bg-white w-full text-center py-2"
          >Buat Subject</RouterLink
        >
        <RouterLink
          to="/admin/subject/edit"
          class="hover:bg-white w-full text-center py-2"
          >Edit Subject</RouterLink
        >
        <RouterLink
          to="/admin/subject/delete"
          class="hover:bg-white w-full text-center py-2"
          >hapus Subject</RouterLink
        >
      </div>
      <div
        @click="userHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2">User</p>
        <img
          :src="`/src/assets/images/${isUserShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isUserShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/admin/user"
          class="hover:bg-white w-full text-center py-1"
          >Lihat User</RouterLink
        >
        <RouterLink
          to="/admin/user/edit"
          class="hover:bg-white w-full text-center py-1"
          >Edit User</RouterLink
        >
      </div>
      <RouterLink
        to="/tutor/nilai-siswa"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all"
        >Nilai Siswa</RouterLink
      >
      <RouterLink
        to="/admin/profil"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all"
        >Profil</RouterLink
      >
    </div>
    <!-- tablet end -->
    <!-- desktop start -->
    <div
      v-if="isTutor"
      class="hidden xl:flex flex-col w-full"
    >
      <div
        @click="modelHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2 text-center">Model</p>
        <img
          :src="`/src/assets/images/${isModelShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isModelShow"
        class="flex flex-col w-full"
      >
        <RouterLink
          to="/tutor/model"
          class="hover:bg-white w-full text-center py-2"
          >Lihat Model</RouterLink
        >
        <RouterLink
          to="/tutor/model/create"
          class="hover:bg-white w-full text-center py-2"
          >Buat Model</RouterLink
        >
        <RouterLink
          to="/tutor/model/edit"
          class="hover:bg-white w-full text-center py-2"
          >Edit Model</RouterLink
        >
        <RouterLink
          to="/tutor/model/delete"
          class="hover:bg-white w-full text-center py-2"
          >hapus Model</RouterLink
        >
      </div>
      <div
        @click="soalHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2 text-center">Soal</p>
        <img
          :src="`/src/assets/images/${isSoalShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isSoalShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/tutor/soal"
          class="hover:bg-white w-full text-center py-2"
          >Lihat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/soal/create"
          class="hover:bg-white w-full text-center py-2"
          >Buat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/soal/edit"
          class="hover:bg-white w-full text-center py-2"
          >Edit Soal</RouterLink
        >
        <RouterLink
          to="/tutor/soal/delete"
          class="hover:bg-white w-full text-center py-2"
          >hapus Soal</RouterLink
        >
      </div>
      <RouterLink
        to="/tutor/nilai-siswa"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all text-center"
        >Nilai Siswa</RouterLink
      >
      <RouterLink
        to="/tutor/profil"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all text-center"
        >Profil</RouterLink
      >
    </div>
    <div
      v-if="isAdmin"
      class="hidden xl:flex flex-col w-full"
    >
      <div
        @click="subjectHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2 text-center">Subject</p>
        <img
          :src="`/src/assets/images/${isSubjectShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isSubjectShow"
        class="flex flex-col w-full"
      >
        <RouterLink
          to="/admin/subject"
          class="hover:bg-white w-full text-center py-2"
          >Lihat Subject</RouterLink
        >
        <RouterLink
          to="/admin/subject/create"
          class="hover:bg-white w-full text-center py-2"
          >Buat Subject</RouterLink
        >
        <RouterLink
          to="/admin/subject/edit"
          class="hover:bg-white w-full text-center py-2"
          >Edit Subject</RouterLink
        >
        <RouterLink
          to="/admin/subject/delete"
          class="hover:bg-white w-full text-center py-2"
          >Hapus Subject</RouterLink
        >
      </div>
      <div
        @click="userHandler"
        class="hover:bg-white w-full py-2 cursor-pointer grid grid-cols-3 px-2 transition-all"
      >
        <p class="col-span-2 text-center">User</p>
        <img
          :src="`/src/assets/images/${isUserShow ? 'down' : 'up'}.svg`"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isUserShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/admin/user"
          class="hover:bg-white w-full text-center py-2"
          >Lihat User</RouterLink
        >
        <RouterLink
          to="/admin/user/edit"
          class="hover:bg-white w-full text-center py-2"
          >Edit User</RouterLink
        >
      </div>
      <RouterLink
        to="/admin/nilai-siswa"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all text-center"
        >Nilai Siswa</RouterLink
      >
      <RouterLink
        to="/admin/profil"
        class="hover:bg-white w-full block py-2 cursor-pointer transition-all text-center"
        >Profil</RouterLink
      >
    </div>
    <!-- desktop end -->
  </aside>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { computed } from "vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

const userStore = useUserStore();

const isModelShow = ref(false);
const isSoalShow = ref(false);
const isSubjectShow = ref(false);
const isUserShow = ref(false);

const modelHandler = () => {
  isModelShow.value = !isModelShow.value;
};
const soalHandler = () => {
  isSoalShow.value = !isSoalShow.value;
};

const subjectHandler = () => {
  isSubjectShow.value = !isSubjectShow.value;
};

const userHandler = () => {
  isUserShow.value = !isUserShow.value;
};

const isTutor = computed(() => userStore.data.user.role === "tutor");
const isAdmin = computed(() => userStore.data.user.role === "admin");
</script>
