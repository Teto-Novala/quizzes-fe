<template>
  <main>
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
        <Button>Mulai Test</Button>
      </div>
    </section>
    <!-- mobile end -->
    <!-- tablet start -->
    <section
      class="hidden xl:hidden md:flex items-center justify-between gap-x-10"
    >
      <div class="font-secondary flex flex-col gap-y-4 w-[50%]">
        <h1 class="font-medium text-2xl">
          Belajar Konsep Baru Disetiap Pertanyaan
        </h1>
        <p class="text-slate-500 text-lg">
          Kami membantu anda mempersiapkan Test
        </p>
        <Button>Mulai Test</Button>
      </div>
      <img
        src="/src/assets/images/home/hero.svg"
        alt="hero"
        class="object-cover object-center w-[50%]"
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
        <Button>Mulai Test</Button>
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
</script>
