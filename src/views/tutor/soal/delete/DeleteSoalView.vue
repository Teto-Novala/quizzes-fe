<template>
  <main class="bg-slate-50 font-primary min-h-screen pt-3">
    <div
      v-if="models === null"
      class="flex justify-center"
    >
      <p>Something went wrong!</p>
    </div>
    <div
      v-else-if="models.length === 0"
      class="flex justify-center"
    >
      <p>Model kosong!</p>
    </div>
    <div v-else>
      <!-- mobile start -->
      <section class="md:hidden flex flex-col items-center gap-y-6 px-8">
        <h1 class="font-secondary font-medium text-2xl">Model</h1>
        <RouterLink
          v-for="(item, index) in models"
          :key="index"
          class="bg-primary w-full text-center py-6 rounded-lg cursor-pointer border border-primary transition-all hover:bg-white hover:text-primary"
          :to="`/tutor/soal/delete/${item.namaModel}/${item.id}`"
        >
          {{ item.namaModel }}
        </RouterLink>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:grid grid-cols-4 justify-items-center gap-y-6 gap-x-4 px-8"
      >
        <h1 class="font-secondary font-medium text-2xl col-span-4">Model</h1>
        <RouterLink
          v-for="(item, index) in models"
          :key="index"
          class="bg-primary w-full text-center py-6 rounded-lg cursor-pointer border border-primary transition-all hover:bg-white hover:text-primary"
          :to="`/tutor/soal/delete/${item.namaModel}/${item.id}`"
        >
          {{ item.namaModel }}
        </RouterLink>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section
        class="hidden xl:grid grid-cols-4 justify-items-center gap-y-6 gap-x-4 px-8"
      >
        <h1 class="font-secondary font-medium text-2xl col-span-4">Model</h1>
        <RouterLink
          v-for="(item, index) in models"
          :key="index"
          class="bg-primary w-full text-center py-6 rounded-lg cursor-pointer border border-primary transition-all hover:bg-white hover:text-primary"
          :to="`/tutor/soal/delete/${item.namaModel}/${item.id}`"
        >
          {{ item.namaModel }}
        </RouterLink>
      </section>
      <!-- desktop end -->
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onMounted, ref } from "vue";
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

onBeforeMount(() => {
  if (!Object.keys(userStore.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const models = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/soal-model/${userStore.data.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    models.value = response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

onMounted(() => {
  fetchAPI();
});
</script>
