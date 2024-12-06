<template>
  <div class="flex flex-col gap-y-2">
    <!-- mobile start -->
    <nav class="md:hidden flex items-center justify-between gap-x-16 py-2">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="flex-1 object-contain object-center"
      />
      <div
        @click="hamburgerHandler"
        v-if="Object.keys(userStore.data).length"
      >
        <div class="flex flex-col gap-y-1 group/humberger">
          <div
            class="w-7 h-1 bg-black group-hover/humberger:bg-primary transition-all"
          ></div>
          <div
            class="w-7 h-1 bg-black group-hover/humberger:bg-primary transition-all"
          ></div>
          <div
            class="w-7 h-1 bg-black group-hover/humberger:bg-primary transition-all"
          ></div>
        </div>
      </div>
      <Button
        v-else
        @click="loginHandler"
        class="flex-1"
        >Login</Button
      >
    </nav>
    <div
      v-if="isShow"
      class="bg-primary flex flex-col items-center gap-y-4 py-2 font-primary md:hidden"
    >
      <RouterLink
        class="hover:bg-white w-full text-center py-1"
        to="/"
        >Home</RouterLink
      >
      <RouterLink
        class="hover:bg-white w-full text-center py-1"
        to="/soal"
        >Soal</RouterLink
      >
      <RouterLink
        class="hover:bg-white w-full text-center py-1"
        to="/nilai-siswa"
        >Nilai Siswa</RouterLink
      >
      <RouterLink
        class="hover:bg-white w-full text-center py-1"
        to="/profil"
        >Profil</RouterLink
      >
      <div
        @click="logOutHandler"
        class="hover:bg-white w-full text-center py-1"
      >
        Logout
      </div>
    </div>
    <!-- mobile end -->
    <!-- tablet start -->
    <nav class="hidden md:flex xl:hidden h-16 items-center justify-between">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="object-contain object-center w-64"
      />
      <div
        v-if="Object.keys(userStore.data).length"
        class="flex items-center justify-center gap-x-5"
      >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/"
          >Home</RouterLink
        >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/soal"
          >Soal</RouterLink
        >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/nilai-siswa"
          >Nilai Siswa</RouterLink
        >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/profil"
          >Profil</RouterLink
        >
        <div
          @click="logOutHandler"
          class="hover:text-secondary transition-all hover:underline"
        >
          Logout
        </div>
      </div>
      <Button
        v-else
        @click="loginHandler"
        class="w-[10%]"
        >Login</Button
      >
    </nav>

    <!-- tablet end -->
    <!-- desktop start -->
    <nav class="hidden xl:flex items-center justify-between">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="object-contain object-center w-64"
      />
      <div
        v-if="Object.keys(userStore.data).length"
        class="flex items-center justify-center gap-x-16"
      >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/"
          >Home</RouterLink
        >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/soal"
          >Soal</RouterLink
        >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/nilai-siswa"
          >Nilai Siswa</RouterLink
        >
        <RouterLink
          class="hover:text-secondary transition-all hover:underline"
          to="/profil"
          >Profil</RouterLink
        >
        <div
          @click="logOutHandler"
          class="hover:text-secondary transition-all hover:underline"
        >
          Logout
        </div>
      </div>
      <Button
        v-else
        @click="loginHandler"
        class="w-[10%]"
        >Login</Button
      >
    </nav>
    <!-- desktop end -->
    <slot></slot>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import Button from "./Button.vue";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const isShow = ref(false);

const hamburgerHandler = () => {
  isShow.value = !isShow.value;
};

const logOutHandler = () => {
  isShow.value = false;
  userStore.reset();
  toast.success("Behasil logout", {
    onClose: () => {
      router.push("/");
    },
  });
};

const loginHandler = () => {
  router.push("/login");
};
</script>
