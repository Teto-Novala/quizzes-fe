<template>
  <main class="min-h-screen font-primary pt-3 bg-slate-50">
    <div
      v-if="models === null"
      class="flex justify-center"
    >
      <p>Something went wrong!</p>
    </div>
    <div v-else>
      <!-- mobile start -->
      <section class="md:hidden flex flex-col items-center gap-y-4 px-8 pb-8">
        <h1 class="font-secondary font-medium text-2xl">Buat Soal</h1>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-5"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="model"
              class="text-lg"
              >Model</label
            >
            <div
              v-if="models.length === 0"
              class="w-full"
            >
              <select
                name="model"
                id="model"
                class="text-base px-3 py-2 w-full"
              >
                <option value="">Model Kosong</option>
              </select>
            </div>
            <div
              v-else
              class="w-full"
            >
              <select
                name="model"
                id="model"
                class="text-base px-3 py-2 w-full"
                v-model="formData.model"
              >
                <option
                  v-for="(item, index) in models"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.namaModel }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="subject"
              class="text-lg"
              >Subject</label
            >
            <Input
              type="text"
              id="subject"
              disabled
              v-model:model="formData.subject"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="soal"
              class="text-lg"
              >Soal</label
            >
            <textarea
              class="outline-none p-3"
              rows="5"
              name="soal"
              id="soal"
              v-model="formData.soal"
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
              v-model:model="formData.pilihanA"
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
              v-model:model="formData.pilihanB"
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
              v-model:model="formData.pilihanC"
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
              v-model:model="formData.pilihanD"
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
              class="text-base px-3 py-2 w-full"
              v-model="formData.jawaban"
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <Button
            type="submit"
            class="w-full"
            >Buat</Button
          >
        </form>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:flex flex-col items-center gap-y-4 px-8 pb-8"
      >
        <h1 class="font-secondary font-medium text-2xl">Buat Soal</h1>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-5"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="model"
              class="text-lg"
              >Model</label
            >
            <div
              v-if="models.length === 0"
              class="w-full"
            >
              <select
                name="model"
                id="model"
                class="text-base px-3 py-2 w-full"
              >
                <option value="">Model Kosong</option>
              </select>
            </div>
            <div
              v-else
              class="w-full"
            >
              <select
                name="model"
                id="model"
                class="text-base px-3 py-2 w-full"
                v-model="formData.model"
              >
                <option
                  v-for="(item, index) in models"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.namaModel }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="subject"
              class="text-lg"
              >Subject</label
            >
            <Input
              type="text"
              id="subject"
              disabled
              v-model:model="formData.subject"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="soal"
              class="text-lg"
              >Soal</label
            >
            <textarea
              class="outline-none p-3"
              rows="5"
              name="soal"
              id="soal"
              v-model="formData.soal"
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
              v-model:model="formData.pilihanA"
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
              v-model:model="formData.pilihanB"
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
              v-model:model="formData.pilihanC"
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
              v-model:model="formData.pilihanD"
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
              class="text-base px-3 py-2 w-full"
              v-model="formData.jawaban"
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <Button
            type="submit"
            class="w-full"
            >Buat</Button
          >
        </form>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section class="hidden xl:flex flex-col items-center gap-y-4 px-8 pb-8">
        <h1 class="font-secondary font-medium text-2xl">Buat Soal</h1>
        <form
          @submit.prevent="submitHandler"
          class="w-full flex flex-col gap-y-5"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="model"
              class="text-lg"
              >Model</label
            >
            <div
              v-if="models.length === 0"
              class="w-full"
            >
              <select
                name="model"
                id="model"
                class="text-base px-3 py-2 w-full"
              >
                <option value="">Model Kosong</option>
              </select>
            </div>
            <div
              v-else
              class="w-full"
            >
              <select
                name="model"
                id="model"
                class="text-base px-3 py-2 w-full"
                v-model="formData.model"
              >
                <option
                  v-for="(item, index) in models"
                  :key="index"
                  :value="item.id"
                >
                  {{ item.namaModel }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="subject"
              class="text-lg"
              >Subject</label
            >
            <Input
              type="text"
              id="subject"
              disabled
              v-model:model="formData.subject"
            />
          </div>
          <div class="flex flex-col gap-y-1">
            <label
              for="soal"
              class="text-lg"
              >Soal</label
            >
            <textarea
              class="outline-none p-3"
              rows="5"
              name="soal"
              id="soal"
              v-model="formData.soal"
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
              v-model:model="formData.pilihanA"
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
              v-model:model="formData.pilihanB"
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
              v-model:model="formData.pilihanC"
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
              v-model:model="formData.pilihanD"
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
              class="text-base px-3 py-2 w-full"
              v-model="formData.jawaban"
            >
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
          </div>
          <Button
            type="submit"
            class="w-full"
            >Buat</Button
          >
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
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();

onBeforeMount(() => {
  if (!Object.keys(userStore.data).length) {
    toast.error("Anda belum login", {
      onClose: () => {
        router.push("/login");
      },
    });
  }
});

const models = ref(null);

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/soal-model/${userStore.data.user.id}`,
      {
        headers: {
          Authorization: `Bearer ${userStore.data.token}`,
        },
      }
    );
    models.value = response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

onMounted(() => {
  fetchAPI();
});

const formData = reactive({
  model: "",
  subject: userStore.data ? userStore.data.user.subject : "",
  soal: "",
  pilihanA: "",
  pilihanB: "",
  pilihanC: "",
  pilihanD: "",
  jawaban: "",
});

const rules = computed(() => {
  return {
    model: {
      required: helpers.withMessage("Model tidak boleh kosong", required),
    },
    subject: {
      required: helpers.withMessage("Subject tidak boleh kosong", required),
    },
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
      required: helpers.withMessage("Pilihan D tidak boleh kosong", required),
    },
    pilihanD: {
      required: helpers.withMessage("Pilihan E tidak boleh kosong", required),
    },
    jawaban: {
      required: helpers.withMessage("Jawaban tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, formData);

const submitHandler = async () => {
  const result = await v$.value.$validate();
  if (result) {
    console.log(formData);
  } else {
    toast.error(v$.value.$errors[0].$message);
  }
};
</script>
