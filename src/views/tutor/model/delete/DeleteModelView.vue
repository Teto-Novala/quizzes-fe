<template>
  <main class="bg-slate-50 min-h-screen pt-3 font-primary">
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
    <div
      v-else
      class="px-8"
    >
      <!-- mobile start -->
      <section class="md:hidden flex flex-col gap-y-6 items-center">
        <h1 class="font-secondary font-medium text-2xl">Hapus Model</h1>
        <div
          v-for="(item, index) in models"
          :key="index"
          @click="deleteHandler(item.id, item.namaModel)"
          class="bg-primary w-full text-center py-6 rounded-lg cursor-pointer border border-primary transition-all hover:bg-white hover:text-primary"
        >
          {{ item.namaModel }}
        </div>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:grid grid-cols-4 place-content-center gap-y-6 justify-items-center gap-x-5"
      >
        <h1
          class="font-secondary font-medium text-2xl col-span-4 place-self-center"
        >
          Hapus Model
        </h1>
        <div
          v-for="(item, index) in models"
          :key="index"
          @click="deleteHandler(item.id, item.namaModel)"
          class="bg-primary w-full text-center py-6 rounded-lg cursor-pointer border border-primary transition-all hover:bg-white hover:text-primary"
        >
          {{ item.namaModel }}
        </div>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section
        class="hidden xl:grid grid-cols-4 place-content-center gap-y-6 justify-items-center gap-x-5"
      >
        <h1
          class="font-secondary font-medium text-2xl col-span-4 place-self-center"
        >
          Hapus Model
        </h1>
        <div
          v-for="(item, index) in models"
          :key="index"
          @click="deleteHandler(item.id, item.namaModel)"
          class="bg-primary w-full text-center py-6 rounded-lg cursor-pointer border border-primary transition-all hover:bg-white hover:text-primary"
        >
          {{ item.namaModel }}
        </div>
      </section>
      <!-- desktop end -->
      <div
        v-if="isDelete"
        class="fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center"
      >
        <div class="bg-white p-5 rounded-lg flex flex-col gap-y-3">
          <p>Apakah anda ingin menghapus {{ formDelete.namaModel }}?</p>
          <div class="flex items-center justify-center gap-x-5">
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
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

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
const isDelete = ref(false);
const formDelete = reactive({ id: "", namaModel: "" });

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

const deleteHandler = (id, namaModel) => {
  formDelete.id = id;
  formDelete.namaModel = namaModel;
  isDelete.value = true;
};

const kembaliHandler = () => {
  formDelete.id = "";
  formDelete.namaModel = "";
  isDelete.value = false;
};

const hapusHandler = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/soal-model/${formDelete.id}`,
      { headers: { Authorization: `Bearer ${userStore.data.token}` } }
    );
    kembaliHandler();
    toast.success(response.data.message, {
      onClose: () => {
        location.reload();
      },
    });
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
</script>
