<template>
  <main class="bg-slate-50 min-h-screen pt-3 font-primary">
    <div
      v-if="soal === null"
      class="flex justify-center"
    >
      <p>Something went wrong!</p>
    </div>
    <div
      v-else-if="soal.length === 0"
      class="flex justify-center"
    >
      <p>Soal kosong!</p>
    </div>
    <div v-else>
      <!-- mobile start -->
      <section class="md:hidden flex flex-col gap-y-4 px-8">
        <h1 class="font-secondary font-medium text-2xl text-center">
          {{ route.params.namaModel }}
        </h1>
        <RouterLink
          v-for="(item, index) in soal"
          :key="index"
          :to="`/tutor/soal/${route.params.namaModel}/${route.params.idModel}/${
            index + 1
          }/${item.id}`"
          class="flex flex-col gap-y-2 bg-primary p-2 rounded-md cursor-pointer border border-primary box-border transition-all group hover:bg-white hover:text-primary"
        >
          <p class="text-lg">Soal {{ index + 1 }}</p>
          <p
            class="bg-white p-2 box-border rounded-lg group-hover:bg-primary group-hover:text-secondary text-justify"
          >
            {{ item.soal }}
          </p>
        </RouterLink>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:flex flex-col items-center w-full gap-y-6 px-8"
      >
        <h1 class="font-secondary font-medium text-2xl text-center">
          {{ route.params.namaModel }}
        </h1>
        <RouterLink
          v-for="(item, index) in soal"
          :key="index"
          :to="`/tutor/soal/${route.params.namaModel}/${route.params.idModel}/${
            index + 1
          }/${item.id}`"
          class="flex flex-col gap-y-2 bg-primary p-2 rounded-md cursor-pointer border border-primary box-border transition-all group hover:bg-white hover:text-primary w-3/4"
        >
          <p class="text-lg">Soal {{ index + 1 }}</p>
          <p
            class="bg-white p-2 box-border rounded-lg group-hover:bg-primary group-hover:text-secondary text-justify"
          >
            {{ item.soal }}
          </p>
        </RouterLink>
      </section>
      <!-- tablet start -->
      <!-- desktop start -->
      <section class="hidden xl:flex flex-col items-center w-full gap-y-6 px-8">
        <h1 class="font-secondary font-medium text-2xl text-center">
          {{ route.params.namaModel }}
        </h1>
        <RouterLink
          v-for="(item, index) in soal"
          :key="index"
          :to="`/tutor/soal/${route.params.namaModel}/${route.params.idModel}/${
            index + 1
          }/${item.id}`"
          class="flex flex-col gap-y-2 bg-primary p-2 rounded-md cursor-pointer border border-primary box-border transition-all group hover:bg-white hover:text-primary w-3/4"
        >
          <p class="text-lg">Soal {{ index + 1 }}</p>
          <p
            class="bg-white p-2 box-border rounded-lg group-hover:bg-primary group-hover:text-secondary text-justify"
          >
            {{ item.soal }}
          </p>
        </RouterLink>
      </section>
      <!-- desktop end -->
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  if (!Object.keys(userStore.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const soal = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/soal/${userStore.data.user.id}/${route.params.idModel}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    soal.value = response.data;
    console.log(soal.value);
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
  }
};

onMounted(() => {
  fetchAPI();
});
</script>
