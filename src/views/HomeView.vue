<template>
  <main>
    <div class="w-10 h-10 bg-primary"></div>
    <div class="w-10 h-10 bg-secondary"></div>
    <p class="text-2xl">Biasa</p>
    <p class="text-2xl font-primary">Biasa</p>
    <p class="text-2xl font-secondary">Biasa</p>

    <Button>Test</Button>
    <Input />
    <form @submit.prevent="submitHandler">
      <Input
        type="email"
        v-model="formData.email"
      />
      <Input
        type="password"
        v-model="formData.password"
      />
      <Button type="submit">Submit</Button>
    </form>
  </main>
</template>
<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { reactive } from "vue";

const formData = reactive({
  email: "",
  password: "",
});

const submitHandler = () => {
  console.log(formData);
};
</script>
