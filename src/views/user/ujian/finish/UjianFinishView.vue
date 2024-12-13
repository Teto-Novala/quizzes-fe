<template>
  <main class="min-h-screen py-5 font-primary">
    <div v-if="!Object.keys(userStore.data).length">
      <h1 class="text-center text-2xl">Anda Belum login</h1>
    </div>
    <div
      v-else
      class="px-8"
    >
      <div v-if="(loadingHasil === false) & (hasil === null)">
        <p>Something wrong happened</p>
      </div>
      <div
        v-if="loadingHasil & (hasil === null)"
        class="text-4xl flex items-center justify-center"
      >
        <div class="pi pi-spin pi-spinner"></div>
      </div>
      <div
        class="md:w-1/2 md:mx-auto"
        v-if="(loadingHasil === false) & (hasil !== null)"
      >
        <div
          class="bg-primary p-5 flex flex-col gap-y-6 items-center rounded-lg"
        >
          <h1 class="text-3xl">Nilai</h1>
          <p class="text-6xl">{{ hasil.nilai }}</p>
        </div>
        <Button
          @click="kembaliHandler"
          class="w-full mt-5"
          >Kembali</Button
        >
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const route = useRoute();

onBeforeMount(() => {
  if (!userStore.data.user) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const hasil = ref(null);
const loadingHasil = ref(false);

const fetchHasil = async () => {
  loadingHasil.value = true;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/jawaban/${route.params.idFinish}`,
      { headers: { Authorization: `Bearer ${userStore.data.token}` } }
    );
    hasil.value = response.data;
  } catch (error) {
    if (error.response.data.message === "Unauthorized") {
      toast.error(error.response.data.message, {
        onClose: () => {
          userStore.reset();
          router.push("/login");
        },
      });
      return;
    }
    toast.error(error.response.data.message);
  } finally {
    loadingHasil.value = false;
  }
};

onMounted(async () => {
  if (hasil.value === null) {
    await fetchHasil();
  }
});

const kembaliHandler = () => {
  router.push("/ujian");
};
</script>
