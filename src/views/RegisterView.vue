<template>
  <main>
    <!-- mobile start -->
    <section class="md:hidden flex flex-col gap-y-10">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="w-full object-contain"
      />
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-3 font-secondary"
      >
        <div class="text-center text-secondary">
          <h1 class="text-2xl">Selamat Datang</h1>
          <p class="text-lg">Silahkan membuat akun</p>
        </div>
        <div>
          <label
            class="text-lg"
            for="username"
            >Username</label
          >
          <Input
            type="text"
            id="username"
            v-model="formData.username"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="email"
            >Email</label
          >
          <Input
            type="email"
            id="email"
            v-model="formData.email"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="password"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model="formData.password"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="k-password"
            >Konfirmasi Password</label
          >
          <Input
            type="password"
            id="k-password"
            v-model="formData.konfirmasiPassword"
          />
        </div>
        <Button type="submit">Register</Button>
        <RouterLink
          to="/login"
          class="underline text-secondary transition-all hover:text-current text-right"
          >Sudah punya akun?</RouterLink
        >
      </form>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section class="hidden xl:hidden md:flex flex-col items-center gap-y-10">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="w-2/3 object-contain"
      />
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-3 font-secondary"
      >
        <div class="text-center text-secondary">
          <h1 class="text-2xl">Selamat Datang</h1>
          <p class="text-lg">Silahkan membuat akun</p>
        </div>
        <div>
          <label
            class="text-lg"
            for="username"
            >Username</label
          >
          <Input
            type="text"
            id="username"
            v-model="formData.username"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="email"
            >Email</label
          >
          <Input
            type="email"
            id="email"
            v-model="formData.email"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="password"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model="formData.password"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="k-password"
            >Konfirmasi Password</label
          >
          <Input
            type="password"
            id="k-password"
            v-model="formData.konfirmasiPassword"
          />
        </div>
        <Button type="submit">Register</Button>
        <RouterLink
          to="/login"
          class="underline text-secondary transition-all hover:text-current text-right"
          >Sudah punya akun?</RouterLink
        >
      </form>
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section
      class="hidden xl:flex items-center justify-center h-screen gap-x-16"
    >
      <form
        @submit.prevent="submitHandler"
        class="flex flex-col gap-y-3 justify-center font-secondary"
      >
        <div class="text-center text-secondary flex flex-col gap-y-2">
          <h1 class="text-2xl">Selamat Datang</h1>
          <p class="text-lg">Silahkan membuat akun</p>
        </div>
        <div>
          <label
            class="text-lg"
            for="username"
            >Username</label
          >
          <Input
            type="text"
            id="username"
            v-model="formData.username"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="email"
            >Email</label
          >
          <Input
            type="email"
            id="email"
            v-model="formData.email"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="password"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model="formData.password"
          />
        </div>
        <div>
          <label
            class="text-lg"
            for="k-password"
            >Konfirmasi Password</label
          >
          <Input
            type="password"
            id="k-password"
            v-model="formData.konfirmasiPassword"
          />
        </div>
        <Button type="submit">Register</Button>
        <RouterLink
          to="/login"
          class="underline text-secondary transition-all hover:text-current text-right"
          >Sudah punya akun?</RouterLink
        >
      </form>
      <img
        src="/src/assets/images/login/hero.svg"
        alt="hero"
        class="w-1/2"
      />
    </section>
    <!-- desktop end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  minLength,
  required,
  sameAs,
} from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const router = useRouter();

const formData = reactive({
  username: "",
  email: "",
  password: "",
  konfirmasiPassword: "",
});

const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username tidak boleh kosong", required),
      minLength: helpers.withMessage(
        "Username minimal 3 karakter",
        minLength(3)
      ),
    },
    email: {
      required: helpers.withMessage("Email tidak boleh kosong", required),
      email: helpers.withMessage("Bukan format email", email),
    },
    password: {
      required: helpers.withMessage("Password tidak boleh kosong", required),
    },
    konfirmasiPassword: {
      required: helpers.withMessage(
        "Konfirmasi Password tidak boleh kosong",
        required
      ),
      sameAs: helpers.withMessage(
        "Konfirmasi Password tidak sama",
        sameAs(formData.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );
      toast.success("Berhasil membuat akun", {
        onClose: () => {
          router.push("/login");
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
