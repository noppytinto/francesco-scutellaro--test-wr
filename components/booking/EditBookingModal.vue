<template>
  <UIBaseModal v-model:open="open">
    <template #title>
      <h1 class="text-xl font-bold">
        <span>Edit </span>
        <span class="text-primary">
          {{
            booking
              ? `${booking.customer.firstName} ${booking.customer.lastName}`
              : ""
          }}
        </span>
        <span> booking</span>
      </h1>
    </template>
    <template #default>
      <form
        class="flex flex-col gap-8"
        id="travel-form"
        @submit.prevent="handleSubmit"
        ref="travelForm"
      >
        <UIFieldset legend="Travel details">
          <UILabel text="Booked travel">
            <UIAutocompleteInput
              :itemTitles="travels.map((t) => t.name)"
              :itemIds="travels.map((t) => t.id)"
              v-model:model-value="selectedTravelId"
              required
            >
              <template #append>
                <UIImg
                  v-if="tempTravelThumbnailURL"
                  :src="tempTravelThumbnailURL"
                  alt="thumbnail"
                  width="80"
                  class="m-2 aspect-square rounded transition-transform hover:scale-150 hover:shadow-lg"
                />
              </template>
            </UIAutocompleteInput>
          </UILabel>
        </UIFieldset>

        <UIFieldset legend="Customer details">
          <UILabel text="Profile picture URL" class="mb-4">
            <UIInput
              name="profilePicture"
              type="url"
              v-model="profilePictureURL"
            >
              <template #append>
                <UIImg
                  v-if="profilePictureURL"
                  :src="profilePictureURL"
                  alt="thumbnail"
                  width="80"
                  class="m-2 rounded-md transition-transform hover:scale-150 hover:shadow-lg"
                  placeholder=""
                  fit="fill"
                />
              </template>
            </UIInput>
          </UILabel>

          <UILabel text="First Name">
            <UIInput
              name="firstName"
              required
              :model-value="booking?.customer.firstName"
            />
          </UILabel>
          <UILabel text="Last Name">
            <UIInput
              name="lastName"
              required
              :model-value="booking?.customer.lastName"
            />
          </UILabel>

          <UILabel text="Age">
            <UIInput
              name="age"
              required
              type="number"
              :min="0"
              :model-value="booking?.customer.age.toString()"
            />
          </UILabel>

          <UILabel text="Email">
            <UIInput
              name="email"
              required
              :model-value="booking?.customer.email"
            />
          </UILabel>

          <UILabel text="Phone Number">
            <UIInput
              name="phoneNumber"
              required
              :model-value="booking?.customer.phoneNumber"
            />
          </UILabel>

          <UILabel text="Gender">
            <UISelect
              name="gender"
              required
              :model-value="booking?.customer.gender"
            >
              <option></option>
              <option :value="USER_GENDER.man">Man</option>
              <option :value="USER_GENDER.woman">Woman</option>
              <option :value="USER_GENDER.nonBinary">Non-binary</option>
              <option :value="USER_GENDER.other">Other</option>
              <option :value="USER_GENDER.preferNotToSay">
                Prefer not to say
              </option>
            </UISelect>
          </UILabel>
        </UIFieldset>

        <UIFieldset legend="Payment details">
          <UILabel text="Payment Method">
            <UISelect
              name="paymentMethod"
              required
              :model-value="booking?.paymentMethod"
              icon="bank"
            >
              <option></option>
              <option :value="PAYMENT_METHODS.CREDIT_TRANSFER">
                Credit Transfer
              </option>
              <option :value="PAYMENT_METHODS.PAYPAL">Paypal</option>
              <option :value="PAYMENT_METHODS.REVOLUT">Revolut</option>
            </UISelect>
          </UILabel>

          <UITextarea
            label="Additional notes"
            name="additionalNotes"
            required
            :model-value="booking?.internalNotes"
          />
        </UIFieldset>
      </form>

      <DeleteSection
        title="Delete this booking"
        button-text="Delete booking"
        @click-delete="isDeleteModalOpen = true"
      />

      <UIConfirmationModal
        v-model:open="isDeleteModalOpen"
        @click-yes="handleClickConfirmDelete"
        title="Delete booking"
        message="Are you sure you want to delete this booking?"
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
import {
  type Booking,
  PAYMENT_METHODS,
  type PaymentMethod,
} from "~/entities/booking/types";
import {
  type Customer,
  USER_GENDER,
  type UserGender,
} from "~/entities/customer/types";
import UISelect from "~/components/ui/inputs/UISelect.vue";
import UIFieldset from "~/components/ui/inputs/UIFieldset.vue";
import UIAutocompleteInput from "~/components/ui/inputs/UIAutocompleteInput.vue";
import UIConfirmationModal from "~/components/ui/UIConfirmationModal.vue";
import DeleteSection from "~/components/DeleteSection.vue";
import { useTravelsStore } from "~/store/travelsStore";
import { useBookingsStore } from "~/store/bookingsStore";

type Props = {
  booking: Booking | undefined;
};

type Emits = {
  (event: "submit"): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

// ====================================================
// STATE & DATA
// ====================================================
const selectedTravelId = ref<string | undefined>(undefined);
const travelsStore = useTravelsStore();
const bookingsStore = useBookingsStore();
const { travels } = storeToRefs(travelsStore);
const tempTravelThumbnailURL = ref("");
const profilePictureURL = ref("");
const travelForm = ref<HTMLFormElement | null>(null);
const isDeleteModalOpen = ref(false);

const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});

// ====================================================
// WATCHERS
// ====================================================
// set the selected travel id and thumbnail url
// on table row click
watch(
  () => props.booking,
  (booking) => {
    if (!booking) return;
    selectedTravelId.value = booking.travel.id;
    tempTravelThumbnailURL.value = booking.travel.thumbnailURL;
    profilePictureURL.value = booking.customer.profilePicture;
  },
);

watch(selectedTravelId, (id) => {
  const travel = travels.value.find((t) => t.id === id);
  tempTravelThumbnailURL.value = travel?.thumbnailURL || "";
});

// ====================================================
// FUNCTIONS
// ====================================================
function handleSubmit() {
  if (!props.booking) return;

  open.value = false;

  const formData = new FormData(travelForm.value!);

  // gather customer data
  const customerData: Customer = {
    ...props.booking.customer,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    age: Number(formData.get("age")),
    email: formData.get("email") as string,
    phoneNumber: formData.get("phoneNumber") as string,
    gender: formData.get("gender") as UserGender,
    profilePicture: formData.get("profilePicture") as string,
  };

  // update booking
  const updatedBooking: Booking = {
    ...props.booking,
    travel: travels.value.find((t) => t.id === selectedTravelId.value)!,
    customer: customerData,
    paymentMethod: formData.get("paymentMethod") as PaymentMethod,
    internalNotes: formData.get("additionalNotes") as string,
  };

  bookingsStore.update(updatedBooking.id, updatedBooking);

  emits("submit");
}

function handleClickConfirmDelete() {
  if (!props.booking) return;

  open.value = false;
  isDeleteModalOpen.value = false;
  bookingsStore.delete(props.booking.id);
  emits("submit");
}
</script>
