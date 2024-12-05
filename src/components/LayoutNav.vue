<template>
  <div class="px-8">
    <Navbar v-if="showNav">
      <RouterView />
    </Navbar>
    <RouterView v-else />
  </div>
</template>

<script setup>
import Navbar from "./Navbar.vue";
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const showNav = computed(() => route.meta.requiresNav);
</script>
