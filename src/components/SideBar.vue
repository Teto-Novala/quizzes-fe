<template>
  <aside class="w-1/5 md:w-1/4 bg-primary font-primary h-auto py-3">
    <!-- tablet start -->
    <div class="xl:hidden w-full flex flex-col text-center">
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
          to="/tutor/lihat-soal"
          class="hover:bg-white w-full text-center py-1"
          >Lihat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/buat-soal"
          class="hover:bg-white w-full text-center py-1"
          >Buat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/edit-soal"
          class="hover:bg-white w-full text-center py-1"
          >Edit Soal</RouterLink
        >
        <RouterLink
          to="/tutor/hapus-soal"
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
    <!-- tablet end -->
    <!-- desktop start -->
    <div class="hidden xl:flex flex-col w-full">
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
          src="/src/assets/images/up.svg"
          alt="svg"
          class="md:w-3 justify-self-end place-self-center"
        />
      </div>
      <div
        v-if="isSoalShow"
        class="flex flex-col"
      >
        <RouterLink
          to="/tutor/lihat-soal"
          class="hover:bg-white w-full text-center py-2"
          >Lihat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/buat-soal"
          class="hover:bg-white w-full text-center py-2"
          >Buat Soal</RouterLink
        >
        <RouterLink
          to="/tutor/edit-soal"
          class="hover:bg-white w-full text-center py-2"
          >Edit Soal</RouterLink
        >
        <RouterLink
          to="/tutor/hapus-soal"
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
    <!-- desktop end -->
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isModelShow = ref(false);
const isSoalShow = ref(false);

const modelHandler = () => {
  isModelShow.value = !isModelShow.value;
};
const soalHandler = () => {
  isSoalShow.value = !isSoalShow.value;
};
</script>
