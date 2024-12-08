<template>
  <main class="bg-slate-50 pt-3 min-h-screen font-primary">
    <div v-if="isAdmin">
      <div
        v-if="subjects === null"
        class="flex justify-center"
      >
        <p>Something went wrong!</p>
      </div>
      <div
        v-else-if="subjects.length === 0"
        class="flex justify-center"
      >
        <p>Subject kosong!</p>
      </div>
      <div v-else>
        <h1 class="font-secondary font-medium text-2xl text-center mb-4">
          Subject
        </h1>
        <!-- mobile start -->
        <section class="md:hidden flex flex-col gap-y-4 px-8">
          <div
            class="bg-primary p-3 text-center rounded-lg border border-primary transition-all hover:bg-white hover:text-primary"
            v-for="(item, index) in subjects"
            :key="index"
          >
            {{ item.nama }}
          </div>
        </section>
        <!-- mobile end -->
        <!-- tablet start -->
        <section class="hidden xl:hidden md:flex flex-col gap-y-4 px-8">
          <div
            class="bg-primary p-3 text-center rounded-lg border border-primary transition-all hover:bg-white hover:text-primary"
            v-for="(item, index) in subjects"
            :key="index"
          >
            {{ item.nama }}
          </div>
        </section>
        <!-- tablet end -->
        <!-- desktop start -->
        <section
          class="hidden xl:grid grid-cols-3 justify-items-stretch gap-x-5 place-content-center px-8"
        >
          <div
            class="bg-primary p-3 text-center rounded-lg border border-primary transition-all hover:bg-white hover:text-primary"
            v-for="(item, index) in subjects"
            :key="index"
          >
            {{ item.nama }}
          </div>
        </section>
        <!-- desktop end -->
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

const isAdmin = computed(() => userStore.data.user.role === "admin");
</script>
