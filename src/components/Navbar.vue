<template>
  <div class="flex flex-col gap-y-2">
    <!-- mobile start -->
    <nav class="md:hidden flex items-center justify-between gap-x-16 py-2">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="flex-1 object-contain object-center"
      />
      <Button
        @click="loginHandler"
        class="flex-1"
        >Login</Button
      >
    </nav>
    <!-- mobile end -->
    <!-- tablet start -->
    <nav class="hidden md:flex xl:hidden h-16 items-center justify-between">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="object-contain object-center w-64"
      />
      <Button
        @click="loginHandler"
        class="w-[15%]"
        >Login</Button
      >
    </nav>
    <!-- tablet end -->
    <!-- desktop start -->
    <nav class="hidden xl:flex items-center justify-between">
      <img
        src="/src/assets/images/logo.svg"
        alt="logo"
        class="object-contain object-center w-64"
      />
      <Button
        @click="loginHandler"
        class="w-fit"
        >Login</Button
      >
    </nav>
    <!-- desktop end -->
    <slot></slot>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import Button from "./Button.vue";

const router = useRouter();

const loginHandler = () => {
  router.push("/login");
};
</script>
