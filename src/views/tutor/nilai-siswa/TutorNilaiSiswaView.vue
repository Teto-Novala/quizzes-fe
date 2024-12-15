<template>
  <main class="bg-slate-50 min-h-screen py-5 font-primary">
    <div v-if="nilaiSiswa === null">
      <h1 class="text-center">Something wrong happened</h1>
    </div>
    <div v-else>
      <h1 class="font-secondary font-medium text-2xl text-center mb-5">
        Nilai Siswa
      </h1>
      <div v-if="nilaiSiswa.length === 0">
        <h1 class="text-center">Nilai Kosong</h1>
      </div>
      <div
        v-else
        class="px-8 flex flex-col items-center"
      >
        <div class="mb-3 flex w-full justify-end">
          <Button @click="downloadHandler">Download</Button>
        </div>
        <table class="w-full text-center">
          <thead>
            <tr>
              <td class="border border-black bg-slate-100 p-1">No</td>
              <td class="border border-black bg-slate-100 p-1">Nama</td>
              <td class="border border-black bg-slate-100 p-1">Subject</td>
              <td class="border border-black bg-slate-100 p-1">Benar</td>
              <td class="border border-black bg-slate-100 p-1">Salah</td>
              <td class="border border-black bg-slate-100 p-1">Nilai</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in nilaiSiswa"
              :key="index"
            >
              <td class="border border-black p-1">
                {{ index + 1 }}
              </td>
              <td class="border border-black p-1">
                {{ item.namaUser }}
              </td>
              <td class="border border-black p-1">
                {{ item.subject }}
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

const nilaiSiswa = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/jawaban/subject/${userStore.data.user.subject}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    nilaiSiswa.value = response.data;
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
  if (nilaiSiswa.value === null) {
    await fetchAPI();
  }
});

const downloadHandler = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/report/subject/${userStore.data.user.subject}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `laporan_nilai_${userStore.data.user.subject}.pdf`
    );
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log(error);

    toast.error("Gagal Mendownload");
  }
};
</script>
