<template>
  <main class="bg-slate-50 font-primary">
    <!-- mobile start -->
    <section
      class="md:hidden flex flex-col items-center gap-y-6 w-full pt-3 h-screen"
    >
      <h1 class="font-secondary font-medium text-2xl">Buat Model</h1>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-3"
      >
        <div>
          <label
            for="namaModel"
            class="text-lg text-secondary"
            >Nama Model</label
          >
          <Input
            type="text"
            id="namaModel"
            v-model:model="formData.namaModel"
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
    <section
      class="hidden xl:hidden md:flex flex-col items-center gap-y-6 w-full pt-3 h-screen"
    >
      <h1 class="font-secondary font-medium text-2xl">Buat Model</h1>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-3 w-2/3"
      >
        <div>
          <label
            for="namaModel"
            class="text-lg text-secondary"
            >Nama Model</label
          >
          <Input
            type="text"
            id="namaModel"
            v-model:model="formData.namaModel"
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
    <section
      class="hidden xl:flex flex-col items-center gap-y-6 w-full pt-3 h-screen"
    >
      <h1 class="font-secondary font-medium text-2xl">Buat Model</h1>
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-3 w-2/3"
      >
        <div>
          <label
            for="namaModel"
            class="text-lg text-secondary"
            >Nama Model</label
          >
          <Input
            type="text"
            id="namaModel"
            v-model:model="formData.namaModel"
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
  if (!Object.keys(userStore.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const formData = reactive({
  namaModel: "",
});

const rules = computed(() => {
  return {
    namaModel: {
      required: helpers.withMessage("Nama model tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/soal-model/create",
        {
          namaModel: formData.namaModel,
          subject: userStore.data.user.subject,
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.data.token}`,
          },
        }
      );
      toast.success(response.data.message, {
        onClose: () => {
          formData.namaModel = "";
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
</script>
