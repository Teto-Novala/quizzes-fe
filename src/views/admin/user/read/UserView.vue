<template>
  <main class="bg-slate-50 pt-3 min-h-screen font-primary">
    <div v-if="isAdmin">
      <div
        v-if="users === null"
        class="flex justify-center"
      >
        <p>Something went wrong</p>
      </div>
      <div
        v-else-if="users.length === 0"
        class="flex justify-center"
      >
        <p>Tidak ada akun</p>
      </div>
      <div
        v-else
        class="px-8 flex flex-col items-center justify-center"
      >
        <h1 class="font-secondary font-medium text-2xl text-center mb-4">
          Lihat User
        </h1>
        <table
          class="xl:w-full text-center rounded-xl border-collapse border border-black"
        >
          <thead class="bg-slate-300">
            <tr>
              <td class="border border-black p-1">No</td>
              <td class="border border-black p-1">Nama lengkap</td>
              <td class="border border-black p-1">Email</td>
              <td class="border border-black p-1">Role</td>
            </tr>
          </thead>
          <tbody class="">
            <tr
              v-for="(item, index) in users"
              :key="index"
              class="hover:bg-primary cursor-pointer transition-all"
              @click="itemHandler(item.id)"
            >
              <td class="border border-black p-1">{{ index + 1 }}</td>
              <td class="border border-black p-1">{{ item.namaLengkap }}</td>
              <td class="border border-black p-1">{{ item.email }}</td>
              <td class="border border-black p-1">{{ item.role }}</td>
            </tr>
          </tbody>
        </table>
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
import { computed, onBeforeMount, onMounted, ref } from "vue";
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

const users = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth", {
      headers: {
        Authorization: `Bearer ${userStore.data.token}`,
      },
    });
    users.value = response.data;
    console.log(users);
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

const itemHandler = (id) => {
  router.push(`/admin/user/${id}`);
};

const isAdmin = computed(() => userStore.data.user.role === "admin");
</script>
