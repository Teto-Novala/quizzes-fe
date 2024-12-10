<template>
  <main class="font-primary min-h-screen pt-3 bg-slate-50">
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
          Soal {{ route.params.noSoal }}
        </h1>
        <div class="w-full flex flex-col gap-y-3">
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
              v-model:model="soal.subject"
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
              disabled
              rows="6"
              v-model="soal.soal"
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
              disabled
              id="pilihanA"
              v-model:model="soal.pilihanA"
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
              disabled
              id="pilihanB"
              v-model:model="soal.pilihanB"
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
              disabled
              id="pilihanC"
              v-model:model="soal.pilihanC"
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
              disabled
              id="pilihanD"
              v-model:model="soal.pilihanD"
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
              disabled
              class="p-2 border border-primary"
            >
              <option :value="soal.jawaban">
                {{ soal.jawaban }}
              </option>
            </select>
          </div>
        </div>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:flex flex-col gap-y-4 items-center px-8 pb-10"
      >
        <h1 class="font-secondary font-medium text-2xl">
          Soal {{ route.params.noSoal }}
        </h1>
        <div class="w-full flex flex-col gap-y-3">
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
              v-model:model="soal.subject"
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
              disabled
              rows="6"
              v-model="soal.soal"
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
              disabled
              id="pilihanA"
              v-model:model="soal.pilihanA"
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
              disabled
              id="pilihanB"
              v-model:model="soal.pilihanB"
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
              disabled
              id="pilihanC"
              v-model:model="soal.pilihanC"
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
              disabled
              id="pilihanD"
              v-model:model="soal.pilihanD"
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
              disabled
              class="p-2 border border-primary"
            >
              <option :value="soal.jawaban">
                {{ soal.jawaban }}
              </option>
            </select>
          </div>
        </div>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section class="hidden xl:flex flex-col gap-y-4 items-center px-8 pb-10">
        <h1 class="font-secondary font-medium text-2xl">
          Soal {{ route.params.noSoal }}
        </h1>
        <div class="w-full flex flex-col gap-y-3">
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
              v-model:model="soal.subject"
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
              disabled
              rows="6"
              v-model="soal.soal"
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
              disabled
              id="pilihanA"
              v-model:model="soal.pilihanA"
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
              disabled
              id="pilihanB"
              v-model:model="soal.pilihanB"
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
              disabled
              id="pilihanC"
              v-model:model="soal.pilihanC"
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
              disabled
              id="pilihanD"
              v-model:model="soal.pilihanD"
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
              disabled
              class="p-2 border border-primary"
            >
              <option :value="soal.jawaban">
                {{ soal.jawaban }}
              </option>
            </select>
          </div>
        </div>
      </section>
      <!-- desktop end -->
    </div>
  </main>
</template>

<script setup>
import Input from "@/components/Input.vue";
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
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
    soal.value.jawaban = soal.value.jawaban.toUpperCase();
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

onMounted(() => {
  fetchAPI();
});
</script>
