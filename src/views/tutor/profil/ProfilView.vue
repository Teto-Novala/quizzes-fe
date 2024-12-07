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
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
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

const formData = reactive({
  username: userStore.data.user.username,
  email: userStore.data.user.email,
});

const editHandler = () => {
  router.push("/tutor/profil/edit");
};

const hapusHandler = async () => {};

const logoutHandler = () => {
  toast.success("Berhasil logout", {
    onClose: () => {
      router.push("/");
    },
  });
  userStore.reset();
};
</script>
