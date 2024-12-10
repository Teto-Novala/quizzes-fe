import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSoalStore = defineStore("soal", () => {
  const data = reactive(
    useLocalStorage("soal", { timeInSecond: 0, noModel: 0, subject: "" })
  );

  const reset = () => {
    data.value.noModel = 0;
    data.value.timeInSecond = 0;
    data.value.subject = "";
  };

  return { data, reset };
});
