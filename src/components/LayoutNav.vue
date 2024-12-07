<template>
  <div>
    <Navbar v-if="showNav">
      <div
        v-if="sideBar"
        class="md:flex"
      >
        <SideBar class="hidden md:flex" />
        <RouterView class="md:w-full" />
      </div>
      <RouterView v-else />
    </Navbar>
    <RouterView v-else />
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import SideBar from "./SideBar.vue";

const sideBar = computed(() => route.meta.requiresSideBar);

const route = useRoute();
const showNav = computed(() => route.meta.requiresNav);
</script>
