<template>
  <main class="min-h-screen pt-3 font-primary bg-slate-50">
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
          Delete {{ route.params.namaModel }}
        </h1>
        <div
          v-for="(item, index) in soal"
          :key="index"
          @click="itemHandler(item.id)"
          class="flex flex-col gap-y-2 bg-primary p-2 rounded-md cursor-pointer border border-primary box-border transition-all group hover:bg-white hover:text-primary"
        >
          <p class="text-lg">Soal {{ index + 1 }}</p>
          <p
            class="bg-white p-2 box-border rounded-lg group-hover:bg-primary group-hover:text-secondary text-justify"
          >
            {{ item.soal }}
          </p>
        </div>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section class="hidden xl:hidden md:flex flex-col gap-y-4 px-8">
        <h1 class="font-secondary font-medium text-2xl text-center">
          Delete {{ route.params.namaModel }}
        </h1>
        <div
          v-for="(item, index) in soal"
          :key="index"
          @click="itemHandler(item.id)"
          class="flex flex-col gap-y-2 bg-primary p-2 rounded-md cursor-pointer border border-primary box-border transition-all group hover:bg-white hover:text-primary"
        >
          <p class="text-lg">Soal {{ index + 1 }}</p>
          <p
            class="bg-white p-2 box-border rounded-lg group-hover:bg-primary group-hover:text-secondary text-justify"
          >
            {{ item.soal }}
          </p>
        </div>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section class="hidden xl:flex flex-col gap-y-4 px-8">
        <h1 class="font-secondary font-medium text-2xl text-center">
          Delete {{ route.params.namaModel }}
        </h1>
        <div
          v-for="(item, index) in soal"
          @click="itemHandler(item.id)"
          :key="index"
          class="flex flex-col gap-y-2 bg-primary p-2 rounded-md cursor-pointer border border-primary box-border transition-all group hover:bg-white hover:text-primary"
        >
          <p class="text-lg">Soal {{ index + 1 }}</p>
          <p
            class="bg-white p-2 box-border rounded-lg group-hover:bg-primary group-hover:text-secondary text-justify"
          >
            {{ item.soal }}
          </p>
        </div>
      </section>
      <!-- desktop end -->
      <div
        v-if="isShow"
        class="fixed bg-black/50 top-0 left-0 right-0 bottom-0 flex justify-center items-center px-8"
      >
        <div class="bg-white p-5 rounded-lg flex flex-col gap-y-3">
          <p class="text-lg">Hapus soal ini?</p>
          <div class="flex items-center justify-center gap-x-4">
            <Button
              @click="kembaliHandler"
              class="w-full"
              >Kembali</Button
            >
            <Button
              @click="hapusHandler"
              class="w-full"
              >Hapus</Button
            >
          </div>
        </div>
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

const isShow = ref(false);
const itemId = ref("");

const kembaliHandler = () => {
  itemId.value = "";
  isShow.value = false;
};

const itemHandler = (id) => {
  itemId.value = id;
  isShow.value = true;
};

const hapusHandler = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/soal/delete/${itemId.value}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );

    toast.success(response.data.message, {
      onClose: () => {
        isShow.value = false;
        location.reload();
      },
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
</script>
