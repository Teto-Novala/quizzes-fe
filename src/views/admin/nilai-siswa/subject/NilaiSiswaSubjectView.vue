<template>
  <main class="min-h-screen py-5 font-primary bg-slate-50">
    <div v-if="isAdmin">
      <h1 class="text-2xl text-center mb-5 font-secondary font-medium">
        Nilai {{ route.params.nama }}
      </h1>
      <div v-if="nilai === null">
        <h1 class="text-center">Nilai Kosong</h1>
      </div>
      <div
        v-else
        class="px-8"
      >
        <div v-if="nilai.length === 0">
          <h1 class="text-center">Nilai Kosong</h1>
        </div>
        <div v-else>
          <div class="mb-3 flex justify-end">
            <Button @click="downloadHandler">Download</Button>
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
    </div>
    <div v-else>Ngpain</div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted } from "vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const route = useRoute();

const isAdmin = ref(false);

onBeforeMount(() => {
  if (!userStore.data.user) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
  if (userStore.data) {
    if (userStore.data.user.role === "admin") {
      isAdmin.value = true;
    } else {
      isAdmin.value = false;
    }
  }
  if (userStore.data.user.role !== "admin") {
    toast.error("Unauthorized", {
      onClose: () => {
        if (userStore.data.user.role === "tutor") {
          router.push("/tutor/dashboard");
        } else {
          router.push("/");
        }
      },
    });
  }
});

const nilai = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/jawaban/subject/${route.params.nama}`,
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
      `http://localhost:5000/api/report/subject/${route.params.nama}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `laporan_nilai_${route.params.nama}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error("Gagal Mendownload");
  }
};
</script>
