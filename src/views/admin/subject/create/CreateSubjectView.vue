<template>
  <main class="bg-slate-50 pt-3 min-h-screen font-primary">
    <div v-if="isAdmin">
      <h1 class="font-secondary font-medium text-2xl mb-4 text-center">
        Buat Subject
      </h1>
      <!-- mobile start -->
      <section class="md:hidden px-8">
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-4"
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
              v-model:model="dataForm.nama"
            />
          </div>
          <Button
            type="submit"
            class="w-full"
            >Buat</Button
          >
        </form>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section class="hidden xl:hidden md:block px-8">
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-4"
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
              v-model:model="dataForm.nama"
            />
          </div>
          <Button
            type="submit"
            class="w-full"
            >Buat</Button
          >
        </form>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section class="hidden xl:block px-8">
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-4"
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
              v-model:model="dataForm.nama"
            />
          </div>
          <Button
            type="submit"
            class="w-full"
            >Buat</Button
          >
        </form>
      </section>
      <!-- desktop end -->
    </div>
    <div v-else>
      <h1>Ngapain</h1>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, reactive } from "vue";
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

const dataForm = reactive({
  nama: "",
});

const rules = computed(() => {
  return {
    nama: {
      required: helpers.withMessage("Nama tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, dataForm);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subject/create",
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${userStore.data.token}`,
          },
        }
      );
      toast.success(response.data.message, {
        onClose: () => {
          dataForm.nama = "";
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
