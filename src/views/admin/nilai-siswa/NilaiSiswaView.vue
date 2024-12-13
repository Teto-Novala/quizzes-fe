<template>
  <main class="min-h-screen py-5 font-primary bg-slate-50">
    <div
      v-if="isAdmin"
      class="flex justify-center"
    >
      <div v-if="subjects === null">
        <h1>Something wrong happened</h1>
      </div>
      <div
        v-else
        class="px-8"
      >
        <h1 class="text-2xl text-center mb-5 font-secondary font-medium">
          Nilai Siswa
        </h1>
        <div
          class="flex flex-col gap-y-8 w-full md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-4"
        >
          <div
            class="border border-primary bg-primary w-full p-8 md:p-5 text-center rounded-lg transition-all hover:bg-white cursor-pointer md:place-self-stretch md:flex md:items-center md:justify-center"
            v-for="(item, index) in subjects"
            :key="index"
            @click="itemSubjectHandler(item.nama)"
          >
            <p>{{ item.nama }}</p>
          </div>
        </div>
        <div v-if="nilaiSiswa === null">
          <h1>Something wrong happened</h1>
        </div>
        <div v-else>
          <div v-if="(nilaiSiswa !== null) & (nilaiSiswa.length === 0)">
            <h1>Nilai Siswa Kosong</h1>
          </div>
          <div v-else>
            <div class="py-9">
              <h1 class="text-2xl text-center mb-5 font-secondary font-medium">
                Seluruh Nilai Siswa
              </h1>
              <table class="w-full text-center">
                <thead>
                  <tr>
                    <td class="border border-black bg-slate-100 p-1">No</td>
                    <td class="border border-black bg-slate-100 p-1">Nama</td>
                    <td class="border border-black bg-slate-100 p-1">
                      Subject
                    </td>
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
        </div>
      </div>
    </div>
    <div v-else>
      <h1>Ngapain</h1>
    </div>
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

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

const subjects = ref(null);
const nilaiSiswa = ref(null);

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
const fetchNilaiSiswa = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/jawaban`, {
      headers: {
        Authorization: `Bearer ${userStore.data.token}`,
      },
    });
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
  await fetchAPI();
  await fetchNilaiSiswa();
});

const itemSubjectHandler = (nama) => {
  router.push(`/admin/nilai-siswa/${nama}`);
};
</script>
