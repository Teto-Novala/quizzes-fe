<template>
  <main class="bg-slate-50 font-primary">
    <!-- mobile start -->
    <section
      class="md:hidden h-screen flex flex-col items-center gap-y-4 px-8 pt-3"
    >
      <h1 class="font-secondary font-medium text-2xl">Edit Profil</h1>
      <form
        @submit.prevent="submitHandler"
        class="w-full flex flex-col gap-y-4"
      >
        <div>
          <label
            for="namaLengkap"
            class="text-lg"
            >Nama Lengkap</label
          >
          <Input
            type="text"
            id="namaLengkap"
            v-model:model="formUpdate.namaLengkap"
          />
        </div>
        <div>
          <label
            for="username"
            class="text-lg"
            >Username</label
          >
          <Input
            type="text"
            id="username"
            v-model:model="formUpdate.username"
          />
        </div>
        <div>
          <label
            for="noHp"
            class="text-lg"
            >No Hp (Whatsapp)</label
          >
          <Input
            type="text"
            id="noHp"
            v-model:model="formUpdate.noHp"
          />
        </div>
        <div>
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <Input
            v-model:model="formUpdate.email"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label
            for="address"
            class="text-lg"
            >Address</label
          >
          <Input
            type="text"
            id="address"
            v-model:model="formUpdate.address"
          />
        </div>
        <Button
          type="submit"
          class="w-full"
          >Edit</Button
        >
      </form>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section
      class="hidden xl:hidden md:flex flex-col items-center px-8 pt-3 h-screen"
    >
      <h1 class="font-secondary font-medium text-2xl">Edit Profil</h1>
      <form
        @submit.prevent="submitHandler"
        class="w-full flex flex-col gap-y-4"
      >
        <div>
          <label
            for="namaLengkap"
            class="text-lg"
            >Nama Lengkap</label
          >
          <Input
            type="text"
            id="namaLengkap"
            v-model:model="formUpdate.namaLengkap"
          />
        </div>
        <div>
          <label
            for="username"
            class="text-lg"
            >Username</label
          >
          <Input
            type="text"
            id="username"
            v-model:model="formUpdate.username"
          />
        </div>
        <div>
          <label
            for="noHp"
            class="text-lg"
            >No Hp (Whatsapp)</label
          >
          <Input
            type="text"
            id="noHp"
            v-model:model="formUpdate.noHp"
          />
        </div>
        <div>
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <Input
            v-model:model="formUpdate.email"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label
            for="address"
            class="text-lg"
            >Address</label
          >
          <Input
            type="text"
            id="address"
            v-model:model="formUpdate.address"
          />
        </div>
        <Button
          type="submit"
          class="w-full"
          >Edit</Button
        >
      </form>
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section class="hidden xl:flex flex-col items-center h-screen px-8 pt-3">
      <h1 class="font-secondary font-medium text-2xl">Edit Profil</h1>
      <form
        @submit.prevent="submitHandler"
        class="w-full flex flex-col gap-y-4"
      >
        <div>
          <label
            for="namaLengkap"
            class="text-lg"
            >Nama Lengkap</label
          >
          <Input
            type="text"
            id="namaLengkap"
            v-model:model="formUpdate.namaLengkap"
          />
        </div>
        <div>
          <label
            for="username"
            class="text-lg"
            >Username</label
          >
          <Input
            type="text"
            id="username"
            v-model:model="formUpdate.username"
          />
        </div>
        <div>
          <label
            for="noHp"
            class="text-lg"
            >No Hp (Whatsapp)</label
          >
          <Input
            type="text"
            id="noHp"
            v-model:model="formUpdate.noHp"
          />
        </div>
        <div>
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <Input
            v-model:model="formUpdate.email"
            type="email"
            id="email"
          />
        </div>
        <div>
          <label
            for="address"
            class="text-lg"
            >Address</label
          >
          <Input
            type="text"
            id="address"
            v-model:model="formUpdate.address"
          />
        </div>
        <Button
          type="submit"
          class="w-full"
          >Edit</Button
        >
      </form>
    </section>
    <!-- desktop end -->
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
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

onBeforeMount(() => {
  if (!Object.keys(userStore.data).length) {
    toast.error("Anda belum login", {
      onClose: () => router.push("/login"),
    });
  }
});

const isConfirm = ref(false);

const formUpdate = reactive({
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

const password = ref("");

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

const v$ = useVuelidate(rules, formUpdate);

const submitHandler = async () => {
  const payload = {
    namaLengkap: formUpdate.namaLengkap,
    username: formUpdate.username,
    noHp: formUpdate.noHp,
    email: formUpdate.email,
    address: formUpdate.address,
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
  location.reload();
};

const kirimHandler = async () => {
  try {
    const response = await axios.put("http://localhost:5000/api/auth/update", {
      id: userStore.data.user.id,
      ...formUpdate,
      password: password.value,
    });
    userStore.data.user = response.data.user;
    isConfirm.value = false;
    password.value = "";
    toast.success("Berhasil update", {
      onClose: () => {
        location.reload();
      },
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
</script>
