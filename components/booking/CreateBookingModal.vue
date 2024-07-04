<template>
  <UIBaseModal title="Create new booking" v-model:open="open">
    <template #default>
      <UITabbedView :tabs="tabs" v-model:current-active-tab="currentActiveTab">
        <template #default="{ activeTab }">
          <div v-if="activeTab === 0">
            <form id="travel-form" class="flex flex-col gap-8 px-6 py-16">
              <UILabel text="Travel">
                <UIAutocompleteInput
                  :itemTitles="allTravels.map((t) => t.name)"
                  :itemIds="allTravels.map((t) => t.id)"
                  v-model:model-value="selectedTravelId"
                  required
                >
                  <template #append>
                    <UIImg
                      v-if="travelThumbnailURL"
                      :src="travelThumbnailURL"
                      alt="thumbnail"
                      width="80"
                      class="m-2 aspect-square rounded transition-transform hover:scale-150 hover:shadow-lg"
                    />
                  </template>
                </UIAutocompleteInput>
              </UILabel>
            </form>
          </div>
          <div v-if="activeTab === 1">
            <form id="customer-form" class="flex flex-col gap-8 px-6 py-16">
              <UILabel text="First Name">
                <UIInput name="firstName" required />
              </UILabel>
              <UILabel text="Last Name">
                <UIInput name="lastName" required />
              </UILabel>
              <UILabel text="Age">
                <UIInput name="age" type="number" required />
              </UILabel>
              <UILabel text="Email">
                <UIInput name="email" type="email" required />
              </UILabel>
              <UILabel text="Phone">
                <UIInput name="phone" type="tel" required />
              </UILabel>
              <UILabel text="Gender">
                <UISelect name="gender" required :model-value="gender">
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
            </form>
          </div>
          <div v-if="activeTab === 2">
            <form id="payment-form" class="flex flex-col gap-8 px-6 py-16">
              <UILabel text="Payment Method">
                <UISelect
                  name="paymentMethod"
                  required
                  v-model:model-value="paymentMethod"
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
            </form>
          </div>
        </template>
      </UITabbedView>
    </template>

    <template #actions>
      <UIButton
        :disabled="currentActiveTab <= 0"
        @click="handleClickPrevious"
        class="mr-4"
      >
        Previous
      </UIButton>
      <UIButton
        :disabled="currentActiveTab >= tabs.length - 1"
        @click="handleClickNext"
      >
        Next
      </UIButton>

      <div class="grow" />

      <div>
        <UIButton
          :disabled="currentActiveTab !== tabs.length - 1"
          form="booking-form"
          type="submit"
        >
          Save
        </UIButton>
      </div>
    </template>
  </UIBaseModal>
</template>
<script setup lang="ts">
import type { Tab } from "~/components/tabs/types";
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UITabbedView from "~/components/tabs/UITabbedView.vue";
import UISelect from "~/components/ui/inputs/UISelect.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import UILabel from "~/components/ui/UILabel.vue";
import UIAutocompleteInput from "~/components/ui/inputs/UIAutocompleteInput.vue";
import { TravelRepository } from "~/respositories/TravelRepository";
import type { Travel } from "~/entities/travel/types";
import { BookingRepository } from "~/respositories/BookingRepository";
import {
  type Booking,
  PAYMENT_METHODS,
  type PaymentMethod,
} from "~/entities/booking/types";
import { USER_GENDER, type UserGender } from "~/entities/customer/types";

const travelRepository = new TravelRepository();
const bookingRepository = new BookingRepository();
const allTravels = ref<Travel[]>([]);
const allBookings = ref<Booking[]>([]);
const defaultTab = 0;
const currentActiveTab = ref(defaultTab);
const selectedTravelId = ref<string | undefined>(undefined);
const travelThumbnailURL = ref("");
const profilePictureURL = ref("");
const gender = ref<UserGender | undefined>(undefined);
const paymentMethod = ref<PaymentMethod | undefined>(undefined);

onMounted(() => {
  allTravels.value = travelRepository.getAll();
  allBookings.value = bookingRepository.getAll();
});

watch(selectedTravelId, (value) => {
  const travel = allTravels.value.find((t) => t.id === value);
  travelThumbnailURL.value = travel?.thumbnailURL ?? "";
});

const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});

const tabs = ref<Tab[]>([
  { title: "Select travel", id: 0 },
  { title: "Fill customer data", id: 1 },
  { title: "Select payment method", id: 2 },
]);

const handleClickPrevious = () => {
  if (currentActiveTab.value > 0) {
    currentActiveTab.value--;
  }
};

const handleClickNext = () => {
  if (currentActiveTab.value < tabs.value.length - 1) {
    currentActiveTab.value++;
  }
};
</script>
