<template>
  <main class="min-h-screen py-5 font-primary">
    <div v-if="!Object.keys(userStore.data).length">
      <h1>Anda Belum Login</h1>
    </div>
    <div
      v-else
      class="px-8 flex flex-col gap-y-4 items-center"
    >
      <h1 class="font-secondary font-medium text-2xl">Edit Profil</h1>
      <form
        @submit.prevent="submitHandler"
        class="w-full flex flex-col gap-y-3 xl:grid xl:grid-cols-2 xl:gap-x-4 xl:w-[80%]"
      >
        <div class="flex flex-col items-start gap-y-2 w-full">
          <label
            class="text-lg"
            for="namaLengkap"
            >Nama Lengkap</label
          >
          <Input
            id="namaLengkap"
            class="bg-white"
            type="text"
            v-model:model="updateForm.namaLengkap"
          />
        </div>
        <div class="flex flex-col items-start gap-y-2 w-full">
          <label
            class="text-lg"
            for="username"
            >Username</label
          >
          <Input
            id="username"
            class="bg-white"
            type="text"
            v-model:model="updateForm.username"
          />
        </div>
        <div class="flex flex-col items-start gap-y-2 w-full">
          <label
            class="text-lg"
            for="no"
            >No Hp (Whatsapp)</label
          >
          <Input
            id="no"
            class="bg-white"
            type="text"
            v-model:model="updateForm.noHp"
          />
        </div>
        <div class="flex flex-col items-start gap-y-2 w-full">
          <label
            class="text-lg"
            for="email"
            >Email</label
          >
          <Input
            id="email"
            class="bg-white"
            type="email"
            v-model:model="updateForm.email"
          />
        </div>
        <div class="flex flex-col items-start gap-y-2 w-full">
          <label
            class="text-lg"
            for="alamat"
            >Alamat</label
          >
          <Input
            id="alamat"
            class="bg-white"
            type="text"
            v-model:model="updateForm.address"
          />
        </div>
        <Button
          type="submit"
          class="w-full xl:col-span-2"
          >Edit</Button
        >
      </form>
      <div
        v-if="isConfirm"
        class="h-screen bg-black/50 fixed top-0 left-0 right-0 bottom-0 justify-center flex items-center p-8"
      >
        <div class="bg-white p-5 flex flex-col gap-y-3 rounded-lg">
          <div>
            <label
              for="password"
              class="text-lg"
              >Masukan Password</label
            >
            <Input
              id="password"
              type="password"
              v-model:model="password"
            />
          </div>
          <div class="w-full flex justify-center items-center gap-x-4">
            <Button
              @click="kembaliHandler"
              class="w-full"
              >Kembali</Button
            >
            <Button
              @click="kirimHandler"
              class="w-full"
              >Kirim</Button
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, ref } from "vue";
import { onBeforeMount, reactive } from "vue";
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

const isConfirm = ref(false);
const password = ref("");

const updateForm = reactive({
  namaLengkap: Object.keys(userStore.data).length
    ? userStore.data.user.namaLengkap
    : "",
  username: Object.keys(userStore.data).length
    ? userStore.data.user.username
    : "",
  noHp: Object.keys(userStore.data).length ? userStore.data.user.noHp : "",
  email: Object.keys(userStore.data).length ? userStore.data.user.email : "",
  address: Object.keys(userStore.data).length
    ? userStore.data.user.address
    : "",
});

const rules = computed(() => {
  return {
    namaLengkap: {
      required: helpers.withMessage(
        "Nama Lengkap tidak boleh kosong",
        required
      ),
      minLength: helpers.withMessage(
        "Nama Lengkap minimal 3 karakter",
        minLength(3)
      ),
    },
    username: {
      required: helpers.withMessage("Username tidak boleh kosong", required),
      minLength: helpers.withMessage(
        "Username minimal 3 karakter",
        minLength(3)
      ),
    },
    noHp: {
      required: helpers.withMessage("No Hp tidak boleh kosong", required),
      minLength: helpers.withMessage("No Hp minimal 11 angka", minLength(11)),
    },
    email: {
      required: helpers.withMessage("Email tidak boleh kosong", required),
      email: helpers.withMessage("Bukan format email", email),
    },
    address: {
      required: helpers.withMessage("Alamat tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, updateForm);

const submitHandler = async () => {
  const payload = {
    namaLengkap: updateForm.namaLengkap,
    username: updateForm.username,
    noHp: updateForm.noHp,
    email: updateForm.email,
    address: updateForm.address,
  };

  const isSame =
    payload.username === userStore.data.user.username &&
    payload.email === userStore.data.user.email &&
    payload.address === userStore.data.user.address &&
    payload.namaLengkap === userStore.data.user.namaLengkap &&
    payload.noHp === userStore.data.user.noHp;

  if (isSame) {
    return;
  }

  const result = await v$.value.$validate();
  if (result) {
    isConfirm.value = true;
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};

const kembaliHandler = () => {
  isConfirm.value = false;
  password.value = "";
  router.go(0);
};

const kirimHandler = async () => {
  try {
    const response = await axios.put("http://localhost:5000/api/auth/update", {
      id: userStore.data.user.id,
      ...updateForm,
      password: password.value,
    });
    userStore.data.user = response.data.user;
    isConfirm.value = false;
    password.value = "";
    toast.success("Berhasil update", {
      onClose: () => {
        router.go(0);
      },
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
</script>
