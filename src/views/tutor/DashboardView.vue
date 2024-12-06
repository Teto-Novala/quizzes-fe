<template>
  <main
    class="flex bg-slate-50 items-center pt-10 justify-center md:items-start font-primary w-full h-screen"
  >
    <h1
      v-if="userStore.data.user"
      class="text-lg md:text-2xl xl:text-xl"
    >
      Selamat Datang {{ userStore.data.user.username }}
    </h1>
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

onBeforeMount(() => {
  if (!userStore.data.user) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});
</script>
