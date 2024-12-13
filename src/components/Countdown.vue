<template>
  <div>
    <p>{{ formattedCountdown }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  countdown: {
    type: Number,
    default: 0,
  },
  onDone: {
    type: Function,
    default: () => {},
  },
});

const intervalRef = ref(null);

const countdown = ref(props.countdown);

const formattedCountdown = computed(() => {
  const minutes = Math.floor(countdown.value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (countdown.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

onMounted(() => {
  intervalRef.value = setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) {
      clearInterval(intervalRef.value);
      // Tambahkan logika ketika countdown selesai
      // console.log("Waktu habis!");
      props.onDone();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalRef.value);
});
</script>
