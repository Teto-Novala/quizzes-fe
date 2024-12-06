<template>
  <input
    v-model="model"
    type="text"
    class="outline-none border border-primary px-3 py-2 rounded-lg font-medium font-secondary w-full"
  />
</template>

<script setup>
const model = defineModel("model");
</script>
