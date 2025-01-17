<template>
  <UIBaseModal title="Create new travel" v-model:open="open">
    <template #default>
      <form
        class="flex flex-col gap-8"
        id="travel-form"
        @submit.prevent="handleSubmit"
        ref="travelForm"
      >
        <UILabel text="Name">
          <UIInput name="name" required />
        </UILabel>
        <UILabel text="Departure">
          <UIInput name="departure" type="date" required />
        </UILabel>
        <UILabel text="Return">
          <UIInput name="return" type="date" required />
        </UILabel>
        <UILabel text="Price (per person)">
          <UIInput type="number" required name="price" :min="0" />
        </UILabel>
        <UILabel text="Thumbnail URL" class="mb-4">
          <UIInput name="thumbnail" type="url" v-model="thumbnailUrl">
            <template #append>
              <UIImg
                v-if="thumbnailUrl"
                :src="thumbnailUrl"
                alt="thumbnail"
                width="80"
                class="m-2 aspect-square rounded transition-transform hover:scale-150 hover:shadow-lg"
                placeholder=""
              />
            </template>
          </UIInput>
        </UILabel>
        <UILabel text="Rating (0-5)">
          <UIInput
            type="number"
            name="rating"
            :min="0"
            :max="5"
            :icon="['fas', 'star']"
          >
          </UIInput>
        </UILabel>

        <UITextarea
          label="Description"
          type="textarea"
          placeholder="Enter a description"
          name="description"
        />
      </form>
    </template>

    <template #actions>
      <UIButton variant="text" @click="open = false">Cancel</UIButton>
      <UIButton form="travel-form" type="submit">Save</UIButton>
    </template>
  </UIBaseModal>
</template>
<script setup lang="ts">
import UITextarea from "~/components/ui/UITextarea.vue";
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UIButton from "~/components/ui/UIButton.vue";
import UILabel from "~/components/ui/UILabel.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import type { Travel } from "~/entities/travel/types";
import { getRandomNumber } from "~/utils/number";
import { useTravelsStore } from "~/store/travelsStore";

type Emits = {
  (event: "submit"): void;
};

const emits = defineEmits<Emits>();

// ====================================================
// STATE & DATA
// ====================================================
const travelsStore = useTravelsStore();
const thumbnailUrl = ref("");
const travelForm = ref<HTMLFormElement | null>(null);
const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});

// ====================================================
// FUNCTIONS
// ====================================================
function handleSubmit() {
  open.value = false;

  const formData = new FormData(travelForm.value!);

  // add travel
  const newTravel: Travel = {
    id: getRandomNumber(1000, 2000).toString(),
    name: formData.get("name") as string,
    departureDate: new Date(formData.get("departure") as string),
    returnDate: new Date(formData.get("return") as string),
    pricePerPerson: Number(formData.get("price")),
    description: formData.get("description") as string,
    thumbnailURL: thumbnailUrl.value,
    averageRating: Number(formData.get("rating")),
  };

  travelsStore.create(newTravel);

  emits("submit");
}
</script>
