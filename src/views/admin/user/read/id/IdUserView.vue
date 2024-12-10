<template>
  <main class="min-h-screen pt-3 bg-slate-50 font-primary">
    <div v-if="isAdmin">
      <div
        v-if="user === null"
        class="flex justify-center"
      >
        <p>Something wrong happened</p>
      </div>
      <div
        v-else
        class="px-8 flex flex-col gap-y-4 items-center"
      >
        <h1 class="font-secondary font-medium text-2xl">User</h1>
        <div class="flex flex-col gap-y-1 w-full">
          <label class="text-lg">Nama Lengkap</label>
          <Input
            type="text"
            disabled
            class="bg-white"
            v-model:model="user.namaLengkap"
          />
        </div>
        <div class="flex flex-col gap-y-1 w-full">
          <label class="text-lg">Username</label>
          <Input
            type="text"
            disabled
            class="bg-white"
            v-model:model="user.username"
          />
        </div>
        <div class="flex flex-col gap-y-1 w-full">
          <label class="text-lg">No Hp (Whatsapp)</label>
          <Input
            type="text"
            disabled
            class="bg-white"
            v-model:model="user.noHp"
          />
        </div>
        <div class="flex flex-col gap-y-1 w-full">
          <label class="text-lg">Email</label>
          <Input
            type="email"
            disabled
            class="bg-white"
            v-model:model="user.email"
          />
        </div>
        <div class="flex flex-col gap-y-1 w-full">
          <label class="text-lg">Address</label>
          <Input
            type="text"
            disabled
            class="bg-white"
            v-model:model="user.address"
          />
        </div>
        <div
          v-if="isTutor"
          class="flex flex-col gap-y-1 w-full"
        >
          <label class="text-lg">Subject</label>
          <Input
            type="text"
            disabled
            class="bg-white"
            v-model:model="user.subject"
          />
        </div>
        <div class="flex flex-col gap-y-1 w-full">
          <label class="text-lg">Role</label>
          <Input
            type="text"
            disabled
            class="bg-white"
            v-model:model="user.role"
          />
        </div>
      </div>
    </div>
    <div v-else>ngapain</div>
  </main>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { computed, onBeforeMount, onMounted, ref } from "vue";
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

const user = ref(null);
const isTutor = ref(false);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/auth/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    user.value = response.data;
    if (user.value) {
      if (user.value.role === "tutor") isTutor.value = true;
    }
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
