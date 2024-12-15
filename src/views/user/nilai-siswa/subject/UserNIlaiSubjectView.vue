<template>
  <main class="py-5 min-h-screen font-primary px-8">
    <div v-if="nilai === null">
      <h1 class="text-2xl text-center">Something wrong happened</h1>
    </div>
    <div v-else>
      <div v-if="nilai.length === 0">
        <h1 class="text-2xl text-center">Nilai Kosong</h1>
      </div>
      <div
        v-else
        class="flex flex-col gap-y-3"
      >
        <h1 class="text-2xl text-center">Nilai {{ route.params.nama }}</h1>
        <div
          @click="downloadHandler"
          class="w-full flex justify-end mb-3"
        >
          <Button>Download</Button>
        </div>
        <table class="w-full text-center">
          <thead>
            <tr>
              <td class="border border-black bg-slate-100 p-1">No</td>
              <td class="border border-black bg-slate-100 p-1">Nama</td>
              <td class="border border-black bg-slate-100 p-1">Benar</td>
              <td class="border border-black bg-slate-100 p-1">Salah</td>
              <td class="border border-black bg-slate-100 p-1">Nilai</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in nilai"
              :key="index"
            >
              <td class="border border-black p-1">
                {{ index + 1 }}
              </td>
              <td class="border border-black p-1">
                {{ item.namaUser }}
              </td>
              <td class="border border-black p-1">
                {{ item.benar }}
              </td>
              <td class="border border-black p-1">
                {{ item.salah }}
              </td>
              <td class="border border-black p-1">
                {{ item.nilai }}
              </td>
            </tr>
          </tbody>
        </table>
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

const nilai = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/jawaban/user/${route.params.nama}/${userStore.data.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    nilai.value = response.data;
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
  if (nilai.value === null) {
    await fetchAPI();
  }
});

const downloadHandler = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/report/user/${userStore.data.user.id}/subject/${route.params.nama}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `laporan_nilai_${route.params.nama}_${userStore.data.user.namaLengkap}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("Gagal Mendownload");
  }
};
</script>
