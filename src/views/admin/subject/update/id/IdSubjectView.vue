<template>
  <main class="bg-slate-50 pt-3 font-primary min-h-screen">
    <div v-if="isAdmin">
      <div
        v-if="subject === null"
        class="flex justify-center"
      >
        <p>Something went wrong!</p>
      </div>
      <div
        v-else
        class="px-8"
      >
        <h1 class="font-secondary font-medium text-center text-2xl mb-4">
          Edit {{ route.params.namaSubject }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-4 xl:w-3/4 xl:mx-auto"
        >
          <div class="flex flex-col items-start gap-y-1">
            <label
              for="nama"
              class="text-lg"
              >Nama</label
            >
            <Input
              type="text"
              id="nama"
              v-model:model="updateForm.nama"
            />
          </div>
          <Button
            class="w-full"
            type="submit"
            >Edit</Button
          >
        </form>
      </div>
    </div>
    <div v-else>Ngapain</div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
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

const subject = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/subject/${route.params.idSubject}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    subject.value = response.data;
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
    updateForm.id = subject.value.id;
    updateForm.nama = subject.value.nama;
  });
});

const updateForm = reactive({
  id: "",
  nama: "",
});

const rules = computed(() => {
  return {
    nama: {
      required: helpers.withMessage("Nama tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, updateForm);

const submitHandler = async () => {
  if (updateForm.nama === subject.value.nama) {
    return;
  }

  const result = await v$.value.$validate();

  if (result) {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/subject/update",
        updateForm,
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
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};

const isAdmin = computed(() => userStore.data.user.role === "admin");
</script>
