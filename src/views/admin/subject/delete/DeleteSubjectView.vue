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
        <h1 class="text-center text-2xl font-secondary font-medium mb-4">
          Hapus Subject
        </h1>
        <section
          class="flex flex-col gap-y-3 md:grid md:grid-cols-3 md:justify-items-stretch md:content-center md:gap-x-4 px-8"
        >
          <div
            class="bg-primary p-3 text-center rounded-lg border border-primary transition-all hover:bg-white hover:text-primary"
            v-for="(item, index) in subjects"
            :key="index"
            @click="subjectHandler(item.id, item.nama)"
          >
            {{ item.nama }}
          </div>
        </section>
        <div
          v-if="isDelete"
          class="fixed top-0 bottom-0 left-0 right-0 bg-black/50 flex items-center justify-center px-8"
        >
          <div class="bg-white p-5 rounded-lg flex flex-col gap-y-3">
            <p class="text-lg text-center">Hapus {{ deleteForm.nama }}?</p>
            <div class="flex items-center gap-x-4">
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
    </div>
    <div v-else>
      <h1>Ngapain</h1>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
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

const isDelete = ref(false);

const deleteForm = reactive({
  id: "",
  nama: "",
});

const kembaliHandler = () => {
  deleteForm.id = "";
  deleteForm.nama = "";
  isDelete.value = false;
};

const subjectHandler = (id, nama) => {
  deleteForm.id = id;
  deleteForm.nama = nama;
  isDelete.value = true;
};

const hapusHandler = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/subject/${deleteForm.id}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    toast.success(response.data.message, {
      onClose: () => {
        kembaliHandler();
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

const isAdmin = computed(() => userStore.data.user.role === "admin");
</script>
