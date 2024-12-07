<template>
  <div class="flex flex-col gap-y-2 xl:gap-y-5">
    <!-- mobile start -->
    <nav class="md:hidden flex items-center justify-between gap-x-16 py-2 px-8">
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
        @click="showHandler"
        class="hover:bg-white w-full text-center py-1"
        to="/"
        >Home</RouterLink
      >
      <div
        v-if="isTutor"
        class="flex flex-col gap-y-4 w-full"
      >
        <div
          @click="modelHandler"
          class="hover:bg-white w-full text-center py-1 flex items-center justify-center gap-x-4"
        >
          <p>Model</p>
          <img
            :src="`/src/assets/images/${isModelShow ? 'down' : 'up'}.svg`"
            alt="svg"
            class="w-3"
          />
        </div>
        <div
          v-if="isModelShow"
          class="flex flex-col gap-y-4 w-full"
        >
          <RouterLink
            to="/tutor/model"
            class="hover:bg-white w-full text-center py-1"
            @click="itemModelHandler"
            >Lihat Model</RouterLink
          >
          <RouterLink
            to="/tutor/model/create"
            class="hover:bg-white w-full text-center py-1"
            @click="itemModelHandler"
            >Buat Model</RouterLink
          >
          <RouterLink
            to="/tutor/model/edit"
            class="hover:bg-white w-full text-center py-1"
            @click="itemModelHandler"
            >Edit Model</RouterLink
          >
          <RouterLink
            to="/tutor/model/delete"
            class="hover:bg-white w-full text-center py-1"
            @click="itemModelHandler"
            >hapus Model</RouterLink
          >
        </div>
        <div
          @click="soalHandler"
          class="hover:bg-white w-full text-center py-1 flex items-center justify-center gap-x-4"
          to="/tutor/soal"
        >
          <p>Soal</p>
          <img
            :src="`/src/assets/images/${isSoalShow ? 'down' : 'up'}.svg`"
            alt="svg"
            class="w-3"
          />
        </div>
        <div
          v-if="isSoalShow"
          class="flex flex-col gap-y-4 w-full"
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
          v-if="isTutor"
          @click="showHandler"
          class="hover:bg-white w-full text-center py-1"
          to="/tutor/nilai-siswa"
          >Nilai Siswa</RouterLink
        >
        <RouterLink
          @click="showHandler"
          class="hover:bg-white w-full text-center py-1"
          to="/tutor/profil"
          >Profil</RouterLink
        >
      </div>
      <div
        v-else-if="isUser"
        class="w-full flex flex-col gap-y-4"
      >
        <RouterLink
          @click="showHandler"
          class="hover:bg-white w-full text-center py-1"
          to="/ujian"
          >Ujian</RouterLink
        >
        <RouterLink
          @click="showHandler"
          class="hover:bg-white w-full text-center py-1"
          to="/histori"
          >Histori</RouterLink
        >
        <RouterLink
          @click="showHandler"
          class="hover:bg-white w-full text-center py-1"
          to="/profil"
          >Profil</RouterLink
        >
      </div>
      <div
        @click="logOutHandler"
        class="hover:bg-white w-full text-center py-1"
      >
        Logout
      </div>
    </div>
    <!-- mobile end -->
    <!-- tablet start -->
    <nav
      class="hidden md:flex xl:hidden h-16 items-center justify-between px-8"
    >
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="object-contain object-center w-64"
      />
      <div
        v-if="Object.keys(userStore.data).length"
        class="flex items-center justify-center gap-x-5"
      >
        <div v-if="isTutor">
          <div
            @click="logOutHandler"
            class="hover:text-secondary transition-all hover:underline"
          >
            Logout
          </div>
        </div>
        <div
          v-else-if="isUser"
          class="flex items-center justify-center gap-x-6"
        >
          <RouterLink
            @click="showHandler"
            class="w-full text-center hover:underline transition-all"
            to="/ujian"
            >Ujian</RouterLink
          >
          <RouterLink
            @click="showHandler"
            class="w-full text-center hover:underline transition-all"
            to="/histori"
            >Histori</RouterLink
          >
          <RouterLink
            @click="showHandler"
            class="w-full text-center hover:underline transition-all"
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
    <nav class="hidden xl:flex items-center justify-between px-8">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="object-contain object-center w-64"
      />
      <div
        v-if="Object.keys(userStore.data).length"
        class="flex items-center justify-center gap-x-16"
      >
        <div v-if="isTutor">
          <div
            @click="logOutHandler"
            class="hover:text-secondary transition-all hover:underline cursor-pointer"
          >
            Logout
          </div>
        </div>
        <div
          v-if="isUser"
          class="flex items-center justify-center gap-x-10"
        >
          <RouterLink
            class="hover:text-secondary transition-all hover:underline"
            to="/"
            >Home</RouterLink
          >
          <RouterLink
            class="hover:bg-white w-full text-center py-1"
            to="/ujian"
            >Ujian</RouterLink
          >
          <RouterLink
            class="hover:bg-white w-full text-center py-1"
            to="/histori"
            >Histori</RouterLink
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
            <p>Logout</p>
          </div>
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
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";

const router = useRouter();
const userStore = useUserStore();
const toast = useToast();

const isShow = ref(false);
const isSoalShow = ref(false);
const isModelShow = ref(false);

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

const showHandler = () => {
  isShow.value = false;
};

const loginHandler = () => {
  router.push("/login");
};

const soalHandler = () => {
  isSoalShow.value = !isSoalShow.value;
};
const modelHandler = () => {
  isModelShow.value = !isModelShow.value;
};

const itemModelHandler = () => {
  modelHandler();
  showHandler();
};

const isTutor = computed(() => userStore.data.user.role === "tutor");
const isUser = computed(() => userStore.data.user.role === "user");
</script>
