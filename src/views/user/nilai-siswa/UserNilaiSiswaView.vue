<template>
  <main class="min-h-screen py-5 font-primary px-8">
    <div v-if="nilaiSiswa === null">
      <h1 class="text-center text-2xl">Something went wrong</h1>
    </div>
    <div v-else>
      <div v-if="nilaiSiswa.length === 0">
        <h1 class="text-center text-2xl">Nilai Kosong</h1>
      </div>
      <div v-else>
        <h1 class="text-center mb-5 text-2xl">Nilai Siswa</h1>
        <div v-if="subjects === null">
          <h1 class="text-center text-2xl">Something went wrong</h1>
        </div>
        <div v-else>
          <div v-if="subjects.length === 0">
            <h1 class="text-center text-2xl">Subject Kosong</h1>
          </div>
          <div
            v-else
            class="flex flex-col items-center gap-y-4"
          >
            <div
              class="flex flex-col gap-y-8 w-full md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-4"
            >
              <div
                v-for="(item, index) in subjects"
                :key="index"
                class="border border-primary bg-primary w-full p-8 md:p-5 text-center rounded-lg transition-all hover:bg-white cursor-pointer md:place-self-stretch md:flex md:items-center md:justify-center"
                @click="itemsSubjectHanlder(item.nama)"
              >
                {{ item.nama }}
              </div>
            </div>
            <h1 class="text-center my-5 text-2xl">Seluruh Nilai</h1>
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
      `http://localhost:5000/api/jawaban/user/${userStore.data.user.id}`,
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

const subjects = ref(null);

const fetchSubject = async () => {
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
  if (nilaiSiswa.value === null) {
    await fetchAPI();
  }
  if (subjects.value === null) {
    await fetchSubject();
  }
});

const itemsSubjectHanlder = (nama) => {
  router.push(`/histori/${nama}`);
};

const downloadHandler = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/report/user/${userStore.data.user.id}`,
      {
        responseType: "blob",
      }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `laporan_nilai_${userStore.data.user.namaLengkap}.pdf`
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
