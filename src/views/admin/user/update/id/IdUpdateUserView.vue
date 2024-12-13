<template>
  <mainc class="min-h-screen pt-3 font-primary bg-slate-50">
    <div
      v-if="user === null"
      class="flex justify-center"
    >
      <p>Something went wrong</p>
    </div>
    <div
      v-else
      class="px-8 flex flex-col gap-y-3"
    >
      <h1 class="font-secondary font-medium text-center text-2xl">Edit User</h1>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-4"
      >
        <div class="flex flex-col items-start gap-y-1">
          <label
            for="username"
            class="text-lg"
            >Username</label
          >
          <Input
            type="text"
            disabled
            id="username"
            v-model:model="user.username"
          />
        </div>
        <div class="flex flex-col items-start gap-y-1">
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <Input
            type="email"
            disabled
            id="email"
            v-model:model="user.email"
          />
        </div>
        <div class="flex flex-col items-start gap-y-1">
          <label
            for="subject"
            class="text-lg"
            >Subjet</label
          >
          <select
            name="subject"
            id="subject"
            v-model="updateForm.subject"
            class="border border-primary w-full p-2 rounded-lg outline-none"
          >
            <option value="">Kosong</option>
            <option
              v-for="(item, index) in subjects"
              :key="index"
              :value="item.nama"
            >
              {{ item.nama }}
            </option>
          </select>
        </div>
        <div>
          <label
            for="role"
            class="text-lg"
            >Subject</label
          >
          <select
            name="role"
            id="role"
            v-model="updateForm.role"
            class="border border-primary w-full p-2 rounded-lg outline-none"
          >
            <option value="user">User</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>
        <Button type="submit">Edit</Button>
      </form>
    </div>
  </mainc>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { reactive } from "vue";
import { onMounted, ref } from "vue";
import { onBeforeMount } from "vue";
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
const subjects = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/auth/${route.params.idUser}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    user.value = response.data;
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
  await fetchAPI().then(() => {
    updateForm.role = user.value.role;
    updateForm.subject = user.value.subject;
  });
  if (subjects.value === null) {
    await fetchSubject();
  }
});

const updateForm = reactive({
  role: "",
  subject: "",
});

const submitHandler = async () => {
  if (
    updateForm.role === user.value.role &&
    updateForm.subject === user.value.subject
  ) {
    return;
  }

  try {
    const response = await axios.put(
      "http://localhost:5000/api/auth/update/role",
      {
        id: user.value.id,
        ...updateForm,
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );

    toast.success(response.data.message, {
      onClose: () => {
        router.go(0);
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
</script>
