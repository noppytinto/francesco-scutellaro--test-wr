<template>
  <UIBaseModal title="Create new booking" v-model:open="open">
    <template #default>
      <UITabbedView
        :tabs="tabsConfig"
        v-model:current-active-tab="currentActiveTab"
        disable-tab-click
      >
        <template #default="{ activeTab }">
          <div v-if="activeTab === 0">
            <form
              id="travel-form"
              class="flex flex-col gap-8 px-6 py-16"
              ref="travelForm"
              @submit.prevent="handleSubmitTravelForm"
            >
              <UILabel text="Travel">
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
            </form>
          </div>
          <div v-if="activeTab === 1">
            <form
              id="customer-form"
              class="flex flex-col gap-8 px-6 py-16"
              ref="customerForm"
              @submit.prevent="handleSubmitCustomerForm"
            >
              <UILabel text="Profile picture URL">
                <UIInput
                  name="profilePicture"
                  type="url"
                  v-model="tempProfilePictureURL"
                >
                  <template #append>
                    <UIImg
                      v-if="tempProfilePictureURL"
                      :src="tempProfilePictureURL"
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
                  :model-value="tempCustomerData?.firstName"
                />
              </UILabel>
              <UILabel text="Last Name">
                <UIInput
                  name="lastName"
                  required
                  :model-value="tempCustomerData?.lastName"
                />
              </UILabel>
              <UILabel text="Age">
                <UIInput
                  name="age"
                  type="number"
                  required
                  :model-value="tempCustomerData?.age.toString()"
                />
              </UILabel>
              <UILabel text="Email">
                <UIInput
                  name="email"
                  type="email"
                  required
                  :model-value="tempCustomerData?.email"
                />
              </UILabel>
              <UILabel text="Phone">
                <UIInput
                  name="phone"
                  type="tel"
                  required
                  :model-value="tempCustomerData?.phoneNumber"
                />
              </UILabel>
              <UILabel text="Gender">
                <UISelect
                  name="gender"
                  required
                  :model-value="tempCustomerData?.gender"
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
            </form>
          </div>
          <div v-if="activeTab === 2">
            <form
              id="payment-form"
              class="flex flex-col gap-8 px-6 py-16"
              ref="paymentForm"
              @submit.prevent="handleSubmitPaymentForm"
            >
              <UILabel text="Payment Method">
                <UISelect
                  name="paymentMethod"
                  required
                  icon="bank"
                  :model-value="tempPaymentData"
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
                :model-value="tempInternalNotes"
              />
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
        :disabled="currentActiveTab >= tabsConfig.length - 1"
        type="submit"
        :form="currentForm"
      >
        Next
      </UIButton>

      <div class="grow" />

      <div>
        <UIButton
          :disabled="currentActiveTab !== tabsConfig.length - 1"
          type="submit"
          form="payment-form"
        >
          Create
        </UIButton>
      </div>
    </template>
  </UIBaseModal>
</template>
<script setup lang="ts">
import type { Tab } from "~/components/ui/tabs/types";
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UITabbedView from "~/components/ui/tabs/UITabbedView.vue";
import UISelect from "~/components/ui/inputs/UISelect.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import UILabel from "~/components/ui/UILabel.vue";
import UIAutocompleteInput from "~/components/ui/inputs/UIAutocompleteInput.vue";
import {
  type Booking,
  PAYMENT_METHODS,
  type PaymentMethod,
} from "~/entities/booking/types";
import { USER_GENDER, type UserGender } from "~/entities/customer/types";
import { getRandomNumber } from "~/utils/number";
import UITextarea from "~/components/ui/UITextarea.vue";
import { useTravelsStore } from "~/store/travelsStore";
import { useBookingsStore } from "~/store/bookingsStore";

type Emits = {
  (event: "submit"): void;
};
const emits = defineEmits<Emits>();

// ====================================================
// STATE & DATA
// ====================================================
const travelsStore = useTravelsStore();
const bookingsStore = useBookingsStore();
const { travels } = storeToRefs(travelsStore);
const currentActiveTab = ref(0);
const selectedTravelId = ref<string | undefined>(undefined);
const tempTravelThumbnailURL = ref("");
const tempProfilePictureURL = ref("");
const bookingFormData = ref<Booking>();
// used to store the data temporarily
// as the user goes through the form
const tempTravelData = ref<Booking["travel"] | undefined>(undefined);
const tempCustomerData = ref<Booking["customer"] | undefined>(undefined);
const tempPaymentData = ref<Booking["paymentMethod"] | undefined>(undefined);
const tempInternalNotes = ref<string | undefined>(undefined);
const travelForm = ref<HTMLFormElement | null>(null);
const customerForm = ref<HTMLFormElement | null>(null);
const paymentForm = ref<HTMLFormElement | null>(null);

const tabsConfig = ref<Tab[]>([
  { title: "Select travel", id: 0 },
  { title: "Fill customer data", id: 1 },
  { title: "Select payment method", id: 2 },
]);

const currentForm = computed(() => {
  if (currentActiveTab.value === 0) return "travel-form";
  if (currentActiveTab.value === 1) return "customer-form";
  if (currentActiveTab.value === 2) return "payment-form";
});

// ====================================================
// WATCHERS
// ====================================================
watch(selectedTravelId, (value) => {
  const travel = travels.value.find((t) => t.id === value);
  tempTravelThumbnailURL.value = travel?.thumbnailURL ?? "";
});

const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});

// ====================================================
// FUNCTIONS
// ====================================================
function handleClickPrevious() {
  if (currentActiveTab.value > 0) {
    currentActiveTab.value--;
  }
}

function goToNextTab() {
  if (currentActiveTab.value < tabsConfig.value.length - 1) {
    currentActiveTab.value++;
  }
}

function handleSubmitTravelForm() {
  if (!selectedTravelId.value) return;

  tempTravelData.value = travels.value.find(
    (t) => t.id === selectedTravelId.value,
  );

  goToNextTab();
}

function handleSubmitCustomerForm() {
  if (!customerForm.value) return;

  const formData = new FormData(customerForm.value);
  tempCustomerData.value = {
    id: getRandomNumber(3000, 4000).toString(),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    age: Number(formData.get("age")),
    email: formData.get("email") as string,
    phoneNumber: formData.get("phone") as string,
    gender: formData.get("gender") as UserGender,
    profilePicture: tempProfilePictureURL.value,
  };

  goToNextTab();
}

function handleSubmitPaymentForm() {
  if (!paymentForm.value) return;

  const formData = new FormData(paymentForm.value);

  bookingFormData.value = {
    id: getRandomNumber(5000, 6000).toString(),
    travel: tempTravelData.value!,
    customer: tempCustomerData.value!,
    paymentMethod: formData.get("paymentMethod") as PaymentMethod,
    internalNotes: formData.get("additionalNotes") as string,
  };

  bookingsStore.create(bookingFormData.value);

  open.value = false;
  resetTempFormData();
  emits("submit");
}

function resetTempFormData() {
  tempTravelData.value = undefined;
  tempCustomerData.value = undefined;
  tempPaymentData.value = undefined;
  tempInternalNotes.value = undefined;
  selectedTravelId.value = undefined;
  tempProfilePictureURL.value = "";
  tempTravelThumbnailURL.value = "";
  currentActiveTab.value = 0;
}
</script>
