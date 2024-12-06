<template>
  <main class="px-8">
    <!-- mobile start -->
    <section class="md:hidden flex flex-col gap-y-10">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="w-full"
      />
      <div class="font-secondary text-center text-slate-500 text-xl">
        <h1>Selamat Datang</h1>
        <p>Silahkan Login atau Register ke akun anda</p>
      </div>
      <form
        @submit.prevent="submitHandler"
        class="font-secondary flex flex-col gap-y-5"
      >
        <div>
          <label
            class="text-slate-500 text-lg"
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
            class="text-slate-500 text-lg"
            for="password"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model="formData.password"
          />
        </div>
        <div class="flex items-center justify-center gap-x-5">
          <Button
            type="submit"
            class="w-full"
            >Login</Button
          >
          <Button
            @click="registerHandler"
            class="w-full"
            >Register</Button
          >
        </div>
      </form>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section
      class="hidden xl:hidden md:flex flex-col gap-y-6 items-center pt-20 w-full"
    >
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="w-1/2"
      />
      <div class="font-secondary text-center text-slate-500 text-xl w-full">
        <h1>Selamat Datang</h1>
        <p>Silahkan Login atau Register ke akun anda</p>
      </div>
      <form
        @submit.prevent="submitHandler"
        class="font-secondary flex flex-col gap-y-5 w-2/3"
      >
        <div>
          <label
            class="text-slate-500 text-lg"
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
            class="text-slate-500 text-lg"
            for="password"
            >Password</label
          >
          <Input
            type="password"
            id="password"
            v-model="formData.password"
          />
        </div>
        <div class="flex items-center justify-center gap-x-5">
          <Button
            type="submit"
            class="w-full"
            >Login</Button
          >
          <Button
            @click="registerHandler"
            class="w-full"
            >Register</Button
          >
        </div>
      </form>
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section class="hidden xl:flex items-center justify-center h-screen">
      <div
        class="flex-1 flex flex-col items-center justify-center gap-y-10 h-screen"
      >
        <img
          src="/src/assets/images/logo.svg"
          alt="logo"
          class="w-2/3 object-contain"
        />
        <div class="font-secondary text-center text-slate-500 text-xl">
          <h1>Selamat Datang</h1>
          <p>Silahkan Login atau Register ke akun anda</p>
        </div>
        <form
          @submit.prevent="submitHandler"
          class="font-secondary flex flex-col gap-y-3 w-full"
        >
          <div>
            <label
              class="text-slate-500 text-lg"
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
              class="text-slate-500 text-lg"
              for="password"
              >Password</label
            >
            <Input
              type="password"
              id="password"
              v-model="formData.password"
            />
          </div>
          <div class="flex items-center justify-center gap-x-5">
            <Button
              type="submit"
              class="w-full"
              >Login</Button
            >
            <Button
              @click="registerHandler"
              class="w-full"
              >Register</Button
            >
          </div>
        </form>
      </div>
      <img
        src="/src/assets/images/login/hero.svg"
        alt="hero"
        class="flex-1"
      />
    </section>
    <!-- desktop end -->
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const toast = useToast();
const userStore = useUserStore();
const router = useRouter();

const formData = reactive({
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

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      userStore.data = response.data;
      toast.success("Berhasil login", {
        onClose: () => {
          if (userStore.data.user.role === "tutor") {
            router.push("/tutor/dashboard");
          } else if (userStore.data.user.role === "user") {
            router.push("/");
          } else {
            router.push("/");
          }
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};

const registerHandler = () => {
  router.push("/register");
};
</script>
