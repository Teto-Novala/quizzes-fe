<template>
  <main class="min-h-screen font-primary pt-3 bg-slate-50">
    <div
      v-if="soal === null"
      class="flex justify-center"
    >
      <p>Something went wrong!</p>
    </div>
    <div
      v-else-if="soal.length === 0"
      class="flex justify-center"
    >
      <p>Soal kosong!</p>
    </div>
    <div v-else>
      <!-- mobile start -->
      <section class="md:hidden flex flex-col gap-y-4 items-center px-8 pb-10">
        <h1 class="font-secondary font-medium text-2xl">
          Edit Soal {{ route.params.noSoal }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-3"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="subject"
              class="text-lg"
              >Subject</label
            >
            <Input
              type="text"
              disabled
              id="subject"
              v-model:model="updateForm.subject"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="soal"
              class="text-lg"
              >Soal</label
            >
            <textarea
              class="p-2 rounded-lg font-medium border border-primary"
              name="soal"
              id="soal"
              cols="30"
              rows="6"
              v-model="updateForm.soal"
            ></textarea>
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanA"
              class="text-lg"
              >Pilihan A</label
            >
            <Input
              type="text"
              id="pilihanA"
              v-model:model="updateForm.pilihanA"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanB"
              class="text-lg"
              >Pilihan B</label
            >
            <Input
              type="text"
              id="pilihanB"
              v-model:model="updateForm.pilihanB"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanC"
              class="text-lg"
              >Pilihan C</label
            >
            <Input
              type="text"
              id="pilihanC"
              v-model:model="updateForm.pilihanC"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanD"
              class="text-lg"
              >Pilihan D</label
            >
            <Input
              type="text"
              id="pilihanD"
              v-model:model="updateForm.pilihanD"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="jawaban"
              class="text-lg"
              >Jawaban</label
            >
            <select
              name="jawaban"
              id="jawaban"
              class="p-2 border border-primary"
              v-model="updateForm.jawaban"
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <Button type="submit">Edit</Button>
        </form>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:flex flex-col gap-y-4 items-center px-8 pb-10"
      >
        <h1 class="font-secondary font-medium text-2xl">
          Edit Soal {{ route.params.noSoal }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-3"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="subject"
              class="text-lg"
              >Subject</label
            >
            <Input
              type="text"
              disabled
              id="subject"
              v-model:model="updateForm.subject"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="soal"
              class="text-lg"
              >Soal</label
            >
            <textarea
              class="p-2 rounded-lg font-medium border border-primary"
              name="soal"
              id="soal"
              cols="30"
              rows="6"
              v-model="updateForm.soal"
            ></textarea>
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanA"
              class="text-lg"
              >Pilihan A</label
            >
            <Input
              type="text"
              id="pilihanA"
              v-model:model="updateForm.pilihanA"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanB"
              class="text-lg"
              >Pilihan B</label
            >
            <Input
              type="text"
              id="pilihanB"
              v-model:model="updateForm.pilihanB"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanC"
              class="text-lg"
              >Pilihan C</label
            >
            <Input
              type="text"
              id="pilihanC"
              v-model:model="updateForm.pilihanC"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanD"
              class="text-lg"
              >Pilihan D</label
            >
            <Input
              type="text"
              id="pilihanD"
              v-model:model="updateForm.pilihanD"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="jawaban"
              class="text-lg"
              >Jawaban</label
            >
            <select
              name="jawaban"
              id="jawaban"
              class="p-2 border border-primary"
              v-model="updateForm.jawaban"
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <Button type="submit">Edit</Button>
        </form>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section class="hidden xl:flex flex-col gap-y-4 items-center px-8 pb-10">
        <h1 class="font-secondary font-medium text-2xl">
          Edit Soal {{ route.params.noSoal }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-3"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="subject"
              class="text-lg"
              >Subject</label
            >
            <Input
              type="text"
              disabled
              id="subject"
              v-model:model="updateForm.subject"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="soal"
              class="text-lg"
              >Soal</label
            >
            <textarea
              class="p-2 rounded-lg font-medium border border-primary"
              name="soal"
              id="soal"
              cols="30"
              rows="6"
              v-model="updateForm.soal"
            ></textarea>
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanA"
              class="text-lg"
              >Pilihan A</label
            >
            <Input
              type="text"
              id="pilihanA"
              v-model:model="updateForm.pilihanA"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanB"
              class="text-lg"
              >Pilihan B</label
            >
            <Input
              type="text"
              id="pilihanB"
              v-model:model="updateForm.pilihanB"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanC"
              class="text-lg"
              >Pilihan C</label
            >
            <Input
              type="text"
              id="pilihanC"
              v-model:model="updateForm.pilihanC"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="pilihanD"
              class="text-lg"
              >Pilihan D</label
            >
            <Input
              type="text"
              id="pilihanD"
              v-model:model="updateForm.pilihanD"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="jawaban"
              class="text-lg"
              >Jawaban</label
            >
            <select
              name="jawaban"
              id="jawaban"
              class="p-2 border border-primary"
              v-model="updateForm.jawaban"
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <Button type="submit">Edit</Button>
        </form>
      </section>
      <!-- desktop end -->
    </div>
  </main>
</template>

<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();
const route = useRoute();

onBeforeMount(() => {
  if (!Object.keys(userStore.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const soal = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/soal/${route.params.idSoal}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    soal.value = response.data;
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
  await fetchAPI().then(() => {
    updateForm.id = soal.value.id;
    updateForm.subject = soal.value.subject;
    updateForm.soal = soal.value.soal;
    updateForm.pilihanA = soal.value.pilihanA;
    updateForm.pilihanB = soal.value.pilihanB;
    updateForm.pilihanC = soal.value.pilihanC;
    updateForm.pilihanD = soal.value.pilihanD;
    updateForm.jawaban = soal.value.jawaban;
  });
});

const updateForm = reactive({
  id: "",
  subject: "",
  soal: "",
  pilihanA: "",
  pilihanB: "",
  pilihanC: "",
  pilihanD: "",
  jawaban: "",
});

const rules = computed(() => {
  return {
    soal: {
      required: helpers.withMessage("Soal tidak boleh kosong", required),
    },
    pilihanA: {
      required: helpers.withMessage("Pilihan A tidak boleh kosong", required),
    },
    pilihanB: {
      required: helpers.withMessage("Pilihan B tidak boleh kosong", required),
    },
    pilihanC: {
      required: helpers.withMessage("Pilihan C tidak boleh kosong", required),
    },
    pilihanD: {
      required: helpers.withMessage("Pilihan D tidak boleh kosong", required),
    },
    jawaban: {
      required: helpers.withMessage("Jawaban tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, updateForm);

const submitHandler = async () => {
  if (
    updateForm.jawaban === soal.value.jawaban &&
    updateForm.pilihanA === soal.value.pilihanA &&
    updateForm.pilihanB === soal.value.pilihanB &&
    updateForm.pilihanC === soal.value.pilihanC &&
    updateForm.pilihanD === soal.value.pilihanD &&
    updateForm.soal === soal.value.soal
  ) {
    return;
  }

  const result = await v$.value.$validate();
  console.log(result);
  if (result) {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/soal/update",
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${userStore.data.token}`,
          },
        }
      );
      toast.success("Berhasil mengupdate", {
        onClose: () => {
          location.reload();
        },
      });
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
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
