<template>
  <main class="bg-slate-50">
    <!-- mobile start -->
    <section
      class="md:hidden flex flex-col gap-y-4 items-center font-primary px-8 pt-3"
    >
      <h1 class="font-secondary font-medium text-2xl mx-auto">Profil</h1>
      <div class="w-full">
        <label
          for="username"
          class="text-lg"
          >Username</label
        >
        <Input
          type="text"
          id="username"
          v-model:model="formData.username"
          disabled
        />
      </div>
      <div class="w-full">
        <label
          for="email"
          class="text-lg"
          >Email</label
        >
        <Input
          type="email"
          id="email"
          v-model:model="formData.email"
          disabled
        />
      </div>
      <Button
        @click="editHandler"
        class="w-full"
        >Edit Profil</Button
      >
      <Button
        @click="hapusHandler"
        class="w-full"
        >Hapus Akun</Button
      >
      <Button
        @click="logoutHandler"
        class="w-full"
        >logout
      </Button>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section
      class="hidden md:grid xl:hidden grid-cols-3 pt-3 px-8 gap-x-3 gap-y-4 h-screen place-content-start"
    >
      <h1 class="font-secondary font-medium text-2xl mx-auto col-span-3">
        Profil
      </h1>
      <div class="w-full col-span-3">
        <label
          for="username"
          class="text-lg"
          >Username</label
        >
        <Input
          type="text"
          id="username"
          v-model:model="formData.username"
          disabled
        />
      </div>
      <div class="w-full col-span-3">
        <label
          for="email"
          class="text-lg"
          >Email</label
        >
        <Input
          type="email"
          id="email"
          v-model:model="formData.email"
          disabled
        />
      </div>
      <Button
        @click="editHandler"
        class="w-full"
        >Edit Profil</Button
      >
      <Button
        @click="hapusHandler"
        class="w-full"
        >Hapus Akun</Button
      >
      <Button
        @click="logoutHandler"
        class="w-full"
        >logout
      </Button>
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section
      class="hidden xl:grid px-8 pt-3 h-screen grid-cols-3 place-content-start gap-y-8 gap-x-4"
    >
      <h1 class="font-secondary font-medium text-2xl mx-auto col-span-3">
        Profil
      </h1>
      <div class="w-full col-span-3">
        <label
          for="username"
          class="text-lg"
          >Username</label
        >
        <Input
          type="text"
          id="username"
          v-model:model="formData.username"
          disabled
        />
      </div>
      <div class="w-full col-span-3">
        <label
          for="email"
          class="text-lg"
          >Email</label
        >
        <Input
          type="email"
          id="email"
          v-model:model="formData.email"
          disabled
        />
      </div>
      <Button
        @click="editHandler"
        class="w-full"
        >Edit Profil</Button
      >
      <Button
        @click="hapusHandler"
        class="w-full"
        >Hapus Akun</Button
      >
      <Button
        @click="logoutHandler"
        class="w-full"
        >logout
      </Button>
    </section>
    <!-- desktop end -->
    <div
      v-if="isDelete"
      class="bg-black/50 fixed top-0 right-0 left-0 bottom-0 font-primary px-8 flex items-center justify-center h-screen"
    >
      <div class="bg-white rounded-lg p-5 flex flex-col gap-y-4">
        <div>
          <label
            for="email"
            class="text-lg"
            >Email</label
          >
          <Input
            type="email"
            id="email"
            v-model:model="formDelete.email"
          />
        </div>
        <div>
          <label
            for="password"
            class="text-lg"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model:model="formDelete.password"
          />
        </div>
        <div class="flex justify-center items-center gap-x-4">
          <Button
            @click="kembaliHandler"
            class="w-full"
            >Kembali</Button
          >
          <Button
            @click="hapusAkun"
            class="w-full"
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

const formData = reactive({
  username: userStore.data.user.username,
  email: userStore.data.user.email,
});

const formDelete = reactive({
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

const v$ = useVuelidate(rules, formDelete);

const editHandler = () => {
  router.push("/tutor/profil/edit");
};

const hapusHandler = async () => {
  isDelete.value = true;
};

const logoutHandler = () => {
  toast.success("Berhasil logout", {
    onClose: () => {
      router.push("/");
    },
  });
  userStore.reset();
};

const kembaliHandler = () => {
  formDelete.email = "";
  formDelete.password = "";
  isDelete.value = false;
};

const hapusAkun = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/auth/delete",
        {
          data: {
            email: formDelete.email,
            password: formDelete.password,
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
