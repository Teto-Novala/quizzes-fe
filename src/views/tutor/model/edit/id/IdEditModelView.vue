<template>
  <main class="min-h-screen font-primary pt-3 bg-slate-50">
    <div
      v-if="model === null"
      class="flex justify-center"
    >
      <p>Something went wrong!</p>
    </div>
    <div v-else>
      <!-- mobile start -->
      <section class="md:hidden flex flex-col items-center gap-y-6 px-8">
        <h1 class="font-secondary font-medium text-2xl">
          Edit {{ model.namaModel }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-3 w-full"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="namaModel"
              class="text-lg"
              >Nama Model</label
            >
            <Input
              type="text"
              id="namaModel"
              v-model:model="formUpdate.namaModel"
            />
          </div>
          <Button class="w-full">Edit</Button>
        </form>
      </section>
      <!-- mobile end -->
      <!-- tablet start -->
      <section
        class="hidden xl:hidden md:flex flex-col items-center gap-y-6 px-8"
      >
        <h1 class="font-secondary font-medium text-2xl">
          Edit {{ model.namaModel }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-3 w-full"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="namaModel"
              class="text-lg"
              >Nama Model</label
            >
            <Input
              type="text"
              id="namaModel"
              v-model:model="formUpdate.namaModel"
            />
          </div>
          <Button class="w-full">Edit</Button>
        </form>
      </section>
      <!-- tablet end -->
      <!-- desktop start -->
      <section
        class="hidden xl:flex flex-col items-center gap-y-6 px-8 w-2/3 mx-auto"
      >
        <h1 class="font-secondary font-medium text-2xl">
          Edit {{ model.namaModel }}
        </h1>
        <form
          @submit.prevent="submitHandler"
          class="flex flex-col gap-y-3 w-full"
        >
          <div class="flex flex-col gap-y-1">
            <label
              for="namaModel"
              class="text-lg"
              >Nama Model</label
            >
            <Input
              type="text"
              id="namaModel"
              v-model:model="formUpdate.namaModel"
            />
          </div>
          <Button class="w-full">Edit</Button>
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

const model = ref(null);

const formUpdate = reactive({
  namaModel: model.value ? model.value.namaModel : "",
});

const fetchAPI = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/soal-model/model/${route.params.id}`,
      { headers: { Authorization: `Bearer ${userStore.data.token}` } }
    );
    model.value = await response.data;
    formUpdate.namaModel = await model.value.namaModel;
  } catch (error) {
    console.log(error);

    if (error.response.data.message === "Unauthorized") {
      toast.error(error.response.data.message, {
        onClose: () => {
          userStore.reset();
          router.push("/login");
        },
      });
    }
    toast.error(error.response.data.message);
  }
};

onMounted(async () => {
  await fetchAPI();
});

const rules = computed(() => {
  return {
    namaModel: {
      required: helpers.withMessage("Nama model tidak boleh kosong", required),
    },
  };
});

const v$ = useVuelidate(rules, formUpdate);

const submitHandler = async () => {
  if (formUpdate.namaModel === model.value.namaModel) {
    return;
  }
  const result = await v$.value.$validate();
  if (result) {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/soal-model/update",
        {
          id: model.value.id,
          namaModel: formUpdate.namaModel,
        },
        {
          headers: {
            Authorization: `Bearer ${userStore.data.token}`,
          },
        }
      );
      toast.success(response.data.message, {
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
