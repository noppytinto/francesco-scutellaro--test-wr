<template>
  <UIBaseModal title="Edit travel" v-model:open="open">
    <template #default>
      <form
        class="mb-8 flex flex-col gap-8"
        id="travel-form"
        @submit.prevent="handleSubmit"
        ref="travelForm"
      >
        <UILabel text="Name">
          <UIInput name="name" required :model-value="travel?.name" />
        </UILabel>
        <UILabel text="Departure">
          <UIInput
            name="departure"
            type="date"
            required
            :model-value="departureDate"
          />
        </UILabel>
        <UILabel text="Return">
          <UIInput
            name="return"
            type="date"
            required
            :model-value="returnDate"
          />
        </UILabel>
        <UILabel text="Price (per person)">
          <UIInput
            type="number"
            required
            name="price"
            :min="0"
            :model-value="pricePerPerson"
            :icon="['fas', 'dollar-sign']"
          >
          </UIInput>
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

        <UILabel text="Rating(0-5)">
          <UIInput
            type="number"
            name="rating"
            :min="0"
            :max="5"
            :model-value="travel?.averageRating?.toString() || ''"
            :icon="['fas', 'star']"
          >
          </UIInput>
        </UILabel>

        <UITextarea
          label="Description"
          type="textarea"
          placeholder="Enter a description"
          name="description"
          :model-value="travel?.description"
        />
      </form>

      <DeleteSection
        title="Delete this travel"
        button-text="Delete travel"
        @click-delete="isDeleteModalOpen = true"
      />

      <UIConfirmationModal
        v-model:open="isDeleteModalOpen"
        @click-yes="handleClickConfirmDelete"
        title="Delete travel"
        message="Are you sure you want to delete this travel?"
      />
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
import { TravelRepository } from "~/respositories/TravelRepository";
import { formatDateToYYYYMMDD } from "~/utils/date";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import DeleteSection from "~/components/DeleteSection.vue";
import UIConfirmationModal from "~/components/ui/UIConfirmationModal.vue";
import { BookingRepository } from "~/respositories/BookingRepository";

type Props = {
  travel: Travel | undefined;
};

type Emits = {
  (event: "submit"): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

// ====================================================
// STATE & DATA
// ====================================================
const travelRepository = new TravelRepository();
const bookingRepository = new BookingRepository();
const thumbnailUrl = ref("");
const travelForm = ref<HTMLFormElement | null>(null);
const isDeleteModalOpen = ref(false);
const departureDate = computed(() => {
  return props.travel ? formatDateToYYYYMMDD(props.travel.departureDate) : "";
});
const returnDate = computed(() => {
  return props.travel ? formatDateToYYYYMMDD(props.travel.returnDate) : "";
});
const pricePerPerson = computed(() => {
  return props.travel ? props.travel.pricePerPerson.toString() : "";
});

const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});
// ====================================================
// LIFECYCLE
// ====================================================
watch(
  () => props.travel,
  () => {
    // the props.travel is not yet available
    // until the row is clicked
    thumbnailUrl.value = props.travel?.thumbnailURL || "";
  },
);

// ====================================================
// FUNCTIONS
// ====================================================
function handleSubmit() {
  if (!props.travel) return;

  open.value = false;

  const formData = new FormData(travelForm.value!);

  // update travel
  const updatedTravel: Travel = {
    ...props.travel,
    name: formData.get("name") as string,
    departureDate: new Date(formData.get("departure") as string),
    returnDate: new Date(formData.get("return") as string),
    pricePerPerson: parseFloat(formData.get("price") as string),
    thumbnailURL: thumbnailUrl.value || "",
    description: formData.get("description") as string,
    averageRating: parseFloat(formData.get("rating") as string),
  };

  travelRepository.update(updatedTravel);

  emits("submit");
}

function handleClickConfirmDelete() {
  if (!props.travel) return;

  travelRepository.delete(props.travel.id);
  // also delete all bookings associated with this travel
  bookingRepository.getAll().forEach((booking) => {
    if (booking.travel.id === props.travel!.id) {
      bookingRepository.delete(booking.id);
    }
  });

  open.value = false;
  isDeleteModalOpen.value = false;
  emits("submit");
}
</script>
