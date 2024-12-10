<template>
  <main class="min-h-screen py-5 font-primary">
    <div v-if="!Object.keys(userStore.data).length">
      <h1>Anda Belum Login</h1>
    </div>
    <div
      v-else
      class="px-8 flex flex-col items-center gap-y-5 pb-6 xl:grid xl:grid-cols-2 xl:gap-x-4"
    >
      <h1
        class="text-2xl font-secondary font-medium xl:col-span-2 xl:place-self-center"
      >
        Profil
      </h1>
      <div class="flex flex-col items-start gap-y-2 w-full">
        <label class="text-lg">Nama Lengkap</label>
        <Input
          disabled
          class="bg-white"
          type="text"
          v-model:model="userStore.data.user.namaLengkap"
        />
      </div>
      <div class="flex flex-col items-start gap-y-2 w-full">
        <label class="text-lg">Username</label>
        <Input
          disabled
          class="bg-white"
          type="text"
          v-model:model="userStore.data.user.username"
        />
      </div>
      <div class="flex flex-col items-start gap-y-2 w-full">
        <label class="text-lg">No Hp (Whatsapp)</label>
        <Input
          disabled
          class="bg-white"
          type="text"
          v-model:model="userStore.data.user.noHp"
        />
      </div>
      <div class="flex flex-col items-start gap-y-2 w-full">
        <label class="text-lg">email</label>
        <Input
          disabled
          class="bg-white"
          type="email"
          v-model:model="userStore.data.user.email"
        />
      </div>
      <div class="flex flex-col items-start gap-y-2 w-full">
        <label class="text-lg">Alamat</label>
        <Input
          disabled
          class="bg-white"
          type="text"
          v-model:model="userStore.data.user.address"
        />
      </div>
      <div
        class="flex flex-col gap-y-4 w-full xl:col-span-2 xl:flex-row xl:gap-x-4"
      >
        <Button
          @click="editHandler"
          class="w-full"
          >Edit Profil</Button
        >
        <Button
          @click="hapusHandler"
          class="w-full"
          >Hapus Profil</Button
        >
        <Button
          @click="logOutHandler"
          class="w-full"
          >Logout</Button
        >
      </div>
    </div>
    <div
      v-if="isDelete"
      class="bg-black/50 flex items-center justify-center fixed top-0 left-0 right-0 bottom-0"
    >
      <div
        class="bg-white p-5 rounded-lg w-[80%] xl:w-1/2 flex flex-col gap-y-2"
      >
        <div class="flex flex-col items-start gap-y-2">
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <Input
            type="email"
            id="email"
            v-model:model="deleteForm.email"
          />
        </div>
        <div class="flex flex-col items-start gap-y-2 w-full">
          <label
            for="password"
            class="text-lg"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model:model="deleteForm.password"
          />
        </div>
        <div class="flex items-start justify-center gap-x-4 w-full">
          <Button
            class="w-full"
            @click="kembaliHandler"
            >Kembali</Button
          >
          <Button
            class="w-full"
            @click="deleteHanlder"
            >Hapus</Button
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
import { email, helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, reactive, ref } from "vue";
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

const isDelete = ref(false);

const logOut = () => {
  userStore.reset();
  router.push("/login");
};

const deleteForm = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage("Email tidak boleh kosong", required),
      email: helpers.withMessage("Bukan format email", email),
    },
    password: {
      required: helpers.withMessage("Password tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, deleteForm);

const kembaliHandler = () => {
  deleteForm.email = "";
  deleteForm.password = "";
  isDelete.value = false;
};

const editHandler = () => {
  router.push("/profil/edit");
};

const hapusHandler = () => {
  isDelete.value = true;
};

const logOutHandler = () => {
  toast.success("Berhasil logout", {
    onClose: () => {
      logOut();
    },
  });
};

const deleteHanlder = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/auth/delete",
        {
          data: {
            email: deleteForm.email,
            password: deleteForm.password,
          },
        }
      );
      userStore.reset();
      toast.success("Berhasil menghapus akun", {
        onClose: () => {
          router.push("/login");
        },
      });
    } catch (error) {
      console.error(error);

      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
