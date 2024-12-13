<template>
  <main class="min-h-screen py-5 font-primary">
    <div v-if="!Object.keys(userStore.data).length">
      <h1 class="text-center text-2xl">Anda Belum login</h1>
    </div>
    <div
      v-else
      class="px-8"
    >
      <div class="flex flex-col gap-y-4 xl:w-2/3 xl:mx-auto">
        <div class="flex justify-between items-center">
          <Button
            :disabled="indexSoal === 0"
            @click="prevSoal"
            class="w-fit text-xl"
          >
            <div class="pi pi-angle-left"></div>
          </Button>
          <Countdown
            :countdown="countdown"
            :onDone="submitHandler"
          />
          <Button
            :disabled="indexSoal === soalsRef.length"
            @click="nextSoal"
            class="w-fit text-xl"
          >
            <div class="pi pi-angle-right"></div>
          </Button>
        </div>
        <div v-if="soals === null">
          <p>Something wrong happened</p>
        </div>
        <div
          v-else
          class="flex flex-col gap-y-4"
        >
          <div class="border border-primary p-3 rounded-lg text-justify">
            <p ref="soal">{{ soalsRef[indexSoal].soal }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Button
              ref="a"
              :class="`${
                selectedAnswer(soalsRef[indexSoal].id, 'a')
                  ? 'bg-white'
                  : 'bg-primary'
              }`"
              @click="valueAHandler(soalsRef[indexSoal].id, 'a')"
              >A. {{ soalsRef[indexSoal].pilihanA }}</Button
            >
            <Button
              ref="b"
              :class="`${
                selectedAnswer(soalsRef[indexSoal].id, 'b')
                  ? 'bg-white'
                  : 'bg-primary'
              }`"
              @click="valueBHandler(soalsRef[indexSoal].id, 'b')"
              >B. {{ soalsRef[indexSoal].pilihanB }}</Button
            >
            <Button
              ref="c"
              :class="`${
                selectedAnswer(soalsRef[indexSoal].id, 'c')
                  ? 'bg-white'
                  : 'bg-primary'
              }`"
              @click="valueCHandler(soalsRef[indexSoal].id, 'c')"
              >C. {{ soalsRef[indexSoal].pilihanC }}</Button
            >
            <Button
              ref="d"
              :class="`${
                selectedAnswer(soalsRef[indexSoal].id, 'd')
                  ? 'bg-white'
                  : 'bg-primary'
              }`"
              @click="valueDHandler(soalsRef[indexSoal].id, 'd')"
              >D. {{ soalsRef[indexSoal].pilihanD }}</Button
            >
          </div>
        </div>
        <Button
          @click="selesaiHandler"
          v-if="indexSoal === soalsRef.length - 1"
          >Selesai</Button
        >
      </div>
      <div
        v-if="isSelesai"
        class="bg-black/50 fixed top-0 right-0 left-0 bottom-0 flex items-center justify-center"
      >
        <div class="p-5 bg-white rounded-lg flex flex-col gap-y-4">
          <p class="text-lg">Yakin sudah selesai?</p>
          <div class="flex items-center justify-center gap-x-3">
            <Button
              @click="kembaliHandler"
              class="w-full"
              >kembali</Button
            >
            <Button
              @click="submitHandler"
              class="w-full"
              >Iya</Button
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Countdown from "@/components/Countdown.vue";
import { useSoalStore } from "@/stores/soal";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  useTemplateRef,
  watch,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const soalStore = useSoalStore();
const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const route = useRoute();

onBeforeMount(() => {
  if (!userStore.data.user) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const pSoal = useTemplateRef("soal");
const buttonA = useTemplateRef("a");
const buttonB = useTemplateRef("b");
const buttonC = useTemplateRef("c");
const buttonD = useTemplateRef("d");

const isSelesai = ref(false);

const indexSoal = ref(0);

const soals = ref(null);

const soalsRef = ref([]);

const countdown = ref(soalStore.data.timeInSecond);

const fetchSoal = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/soal/user",
      {
        subject: soalStore.data.subject,
        noModel: soalStore.data.noModel,
      },
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    soals.value = response.data;
    soalsRef.value = soals.value;
  } catch (error) {
    if (error.response.data.message === "Unauthorized") {
      toast.error(error.response.data.message, {
        onClose: () => {
          userStore.reset();
          router.push("/login");
        },
      });
      return;
    }
    toast.error(error.response.data.message);
  }
};

onMounted(async () => {
  if (soals.value === null) {
    await fetchSoal();
  }
});

const jawabanForm = reactive({
  noModel: soalStore.data.noModel,
  subject: soalStore.data.subject,
  jawaban: [],
});

const createAnswerObject = (id, jawaban) => {
  return {
    id: id,
    jawaban: jawaban,
  };
};

const valueAHandler = (id, jawaban) => {
  const existingAnswer = jawabanForm.jawaban.find((answer) => answer.id === id);

  if (existingAnswer) {
    existingAnswer.jawaban = jawaban;
  } else {
    const payload = createAnswerObject(id, jawaban);
    jawabanForm.jawaban.push(payload);
  }
  console.log(jawabanForm);
};
const valueBHandler = (id, jawaban) => {
  const existingAnswer = jawabanForm.jawaban.find((answer) => answer.id === id);

  if (existingAnswer) {
    existingAnswer.jawaban = jawaban;
  } else {
    const payload = createAnswerObject(id, jawaban);
    jawabanForm.jawaban.push(payload);
  }
};
const valueCHandler = (id, jawaban) => {
  const existingAnswer = jawabanForm.jawaban.find((answer) => answer.id === id);

  if (existingAnswer) {
    existingAnswer.jawaban = jawaban;
  } else {
    const payload = createAnswerObject(id, jawaban);
    jawabanForm.jawaban.push(payload);
  }
};
const valueDHandler = (id, jawaban) => {
  const existingAnswer = jawabanForm.jawaban.find((answer) => answer.id === id);

  if (existingAnswer) {
    existingAnswer.jawaban = jawaban;
  } else {
    const payload = createAnswerObject(id, jawaban);
    jawabanForm.jawaban.push(payload);
  }
};

const selectedAnswer = (id, jawaban) => {
  if (jawabanForm.jawaban.length > 0) {
    const data = jawabanForm.jawaban.find((answer) => answer.id === id);

    if (data) {
      if (data.jawaban === jawaban) {
        return true;
      }
    }
    return false;
  }
};

const nextSoal = () => {
  if (soals.value) {
    if (indexSoal.value === soals.value.length - 1) {
      return;
    }
  }
  indexSoal.value += 1;
};
const prevSoal = () => {
  if (indexSoal.value === 0) {
    return;
  }

  indexSoal.value -= 1;
};

watch(indexSoal, async (newValue, oldValue) => {
  if (newValue > oldValue) {
    pSoal.value.innerText = soalsRef.value[newValue].soal;
    buttonA.value.$el.innerText = `A. ${soalsRef.value[newValue].pilihanA}`;
    buttonB.value.$el.innerText = `B. ${soalsRef.value[newValue].pilihanB}`;
    buttonC.value.$el.innerText = `C. ${soalsRef.value[newValue].pilihanC}`;
    buttonD.value.$el.innerText = `D. ${soalsRef.value[newValue].pilihanD}`;
  }
  if (newValue <= oldValue) {
    pSoal.value.innerText = soalsRef.value[newValue].soal;
    buttonA.value.$el.innerText = `A. ${soalsRef.value[newValue].pilihanA}`;
    buttonB.value.$el.innerText = `B. ${soalsRef.value[newValue].pilihanB}`;
    buttonC.value.$el.innerText = `C. ${soalsRef.value[newValue].pilihanC}`;
    buttonD.value.$el.innerText = `D. ${soalsRef.value[newValue].pilihanD}`;
  }
});

const selesaiHandler = () => {
  isSelesai.value = true;
};

const kembaliHandler = () => {
  isSelesai.value = false;
};

const submitHandler = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/jawaban/create",
      jawabanForm,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    router.push(
      `/ujian/${route.params.namaSubject}/finish/${response.data.id}`
    );
    soalStore.reset();
  } catch (error) {
    if (error.response.data.message === "Unauthorized") {
      toast.error(error.response.data.message, {
        onClose: () => {
          userStore.reset();
          router.push("/login");
        },
      });
      return;
    }
    toast.error(error.response.data.message);
  }
};
</script>
