import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("user", () => {
  const data = reactive(useLocalStorage("user", {}));

  const reset = () => {
    data.value = {};
  };

  return { data, reset };
});
