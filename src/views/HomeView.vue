<template>
  <main class="px-8">
    <!-- mobile start -->
    <section class="md:hidden">
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
      />
      <div class="font-secondary flex flex-col gap-y-4">
        <h1 class="font-medium text-2xl">
          Belajar Konsep Baru Disetiap Pertanyaan
        </h1>
        <p class="text-slate-500 text-lg">
          Kami membantu anda mempersiapkan Test
        </p>
        <Button @click="mulaiHandler">Mulai Test</Button>
      </div>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section
      class="hidden xl:hidden md:flex items-center justify-center gap-x-5"
    >
      <div class="font-secondary flex flex-col gap-y-4 w-[40%]">
        <h1 class="font-medium text-2xl">
          Belajar Konsep Baru Disetiap Pertanyaan
        </h1>
        <p class="text-slate-500 text-lg">
          Kami membantu anda mempersiapkan Test
        </p>
        <Button @click="mulaiHandler">Mulai Test</Button>
      </div>
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
        class="w-[50%] scale-125"
      />
    </section>
    <!-- tablet end -->
    <!-- desktop start -->
    <section class="hidden xl:flex items-center justify-evenly">
      <div class="font-secondary flex flex-col gap-y-11">
        <h1 class="font-medium text-4xl">
          Belajar<br />Konsep Baru<br />Disetiap Pertanyaan
        </h1>
        <p class="text-slate-500 text-xl">
          Kami membantu anda mempersiapkan Test
        </p>
        <Button @click="mulaiHandler">Mulai Test</Button>
      </div>
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
        class="object-cover object-center w-[40%]"
      />
    </section>
    <!-- desktop end -->
  </main>
</template>
<script setup>
import Button from "@/components/Button.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const mulaiHandler = () => {
  if (!Object.keys(userStore.data).length) {
    router.push("/login");
  }

  if (Object.keys(userStore.data).length) {
    if (userStore.data.user.role === "tutor") {
      router.push("/tutor/dashboard");
    }
    if (userStore.data.user.role === "admin") {
      router.push("/admin/dashboard");
    }
    if (userStore.data.user.role === "user") {
      router.push("/ujian");
    }
  }
};
</script>
