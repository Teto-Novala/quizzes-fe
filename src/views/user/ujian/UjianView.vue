<template>
  <main class="min-h-screen py-5 font-primary">
    <div v-if="!Object.keys(userStore.data).length">
      <h1 class="text-center text-2xl">Anda Belum login</h1>
    </div>
    <div
      v-else
      class="px-8 flex flex-col gap-y-4 items-center"
    >
      <h1 class="font-secondary font-medium text-2xl">Ujian</h1>
      <div v-if="subjects === null">
        <h1>Subject tidak ada</h1>
      </div>
      <div
        v-else
        class="flex flex-col gap-y-3 w-full md:flex-row md:gap-x-4"
      >
        <div
          class="w-full bg-primary text-center p-6 rounded-lg text-lg transition-all cursor-pointer border border-primary hover:bg-white hover:text-secondary"
          v-for="(item, index) in subjects"
          :key="index"
          @click="itemHandler(item.nama)"
        >
          {{ item.nama }}
        </div>
      </div>
      <div
        v-if="isClicked"
        class="bg-black/50 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center px-8"
      >
        <div
          class="bg-white p-4 rounded-lg w-full md:w-1/2 xl:w-1/4 flex flex-col gap-y-4"
        >
          <p>Jumlah Soal : {{ infoForm.quantity }}</p>
          <p>Waktu : {{ infoForm.time }}</p>
          <div class="flex items-center justify-center gap-x-3">
            <Button
              @click="kembaliHandler"
              class="w-full"
              >Kembali</Button
            >
            <Button
              @click="mulaiHandler"
              class="w-full"
              >Mulai</Button
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useSoalStore } from "@/stores/soal";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const soalStore = useSoalStore();
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

const isClicked = ref(false);

const infoForm = reactive({
  quantity: 0,
  time: "",
});

const subjects = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/subject`, {
      headers: {
        Authorization: `Bearer ${userStore.data.token}`,
      },
    });
    subjects.value = response.data;
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

onMounted(async () => {
  await fetchAPI();
});

const itemHandler = async (subject) => {
  try {
    const response = await axios.post("http://localhost:5000/api/soal/random", {
      subject: subject,
    });
    infoForm.quantity = response.data.quantity;
    infoForm.time = response.data.time;
    soalStore.data.noModel = response.data.noModel;
    soalStore.data.timeInSecond = response.data.timeInSecond;
    soalStore.data.subject = response.data.subject;
    isClicked.value = true;
  } catch (error) {
    toast.error(error.response.data.message);
    isClicked.value = false;
  }
};

const kembaliHandler = () => {
  infoForm.quantity = 0;
  infoForm.time = "";
  soalStore.reset();
  isClicked.value = false;
};

const mulaiHandler = () => {
  router.push(`/ujian/${soalStore.data.subject}`);
};
</script>
