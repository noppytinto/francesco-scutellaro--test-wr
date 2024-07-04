<template>
  <div>
    <UITableActions class="mb-4">
      <UIInput
        type="search"
        placeholder="search"
        icon="magnifying-glass"
        class="max-w-96 grow"
        v-model="searchValue"
      />
      <UIButton icon="plus"> Add Booking </UIButton>
    </UITableActions>

    <!--======== travels table ========-->
    <UITable :headers :data="bookings" row-class="cursor-pointer">
      <template #default="{ value: booking }">
        <UITableData class="flex items-center gap-3">
          <UIImg
            :src="booking.customer.profilePicture"
            alt="profile picture"
            class="b rounded-full shadow-md transition-transform hover:scale-150"
            width="30"
            height="30"
          />
          <p>
            {{ booking.customer.firstName + " " + booking.customer.lastName }}
          </p>
        </UITableData>

        <UITableData>{{ booking.customer.email }}</UITableData>

        <UITableData>{{ booking.customer.phoneNumber }}</UITableData>

        <UITableData>{{ booking.travel.name }}</UITableData>

        <UITableData>
          <PaymentTag :paymentMethod="booking.paymentMethod" />
        </UITableData>
      </template>
    </UITable>

    <!--    <BaseModal title="Test" v-model:open="isModalOpen">-->
    <!--      <template #default>-->
    <!--        <form-->
    <!--          class="flex flex-col gap-8"-->
    <!--          id="booking-form"-->
    <!--          @submit.prevent="handleSubmit"-->
    <!--          ref="bookingForm"-->
    <!--        >-->
    <!--          <MyLabel text="First Name">-->
    <!--            <MyInput-->
    <!--              name="firstName"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.customer.firstName"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="Last Name">-->
    <!--            <MyInput-->
    <!--              name="lastName"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.customer.lastName"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="Email">-->
    <!--            <MyInput-->
    <!--              name="email"-->
    <!--              type="email"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.customer.email"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="Phone Number">-->
    <!--            <MyInput-->
    <!--              name="phone"-->
    <!--              type="tel"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.customer.phoneNumber"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="age">-->
    <!--            <MyInput-->
    <!--              name="age"-->
    <!--              type="number"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.customer.age.toString()"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="gender">-->
    <!--            <MyInput-->
    <!--              name="gender"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.customer.gender"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="payment method">-->
    <!--            <MyInput-->
    <!--              name="paymentMethod"-->
    <!--              required-->
    <!--              :model-value="clickedBooking?.paymentMethod"-->
    <!--            />-->
    <!--          </MyLabel>-->

    <!--          <MyLabel text="Departure">-->
    <!--            <MyInput-->
    <!--              name="departure"-->
    <!--              type="date"-->
    <!--              required-->
    <!--              :model-value="formatDate(clickedBooking?.departureDate)"-->
    <!--            />-->
    <!--          </MyLabel>-->
    <!--          <MyLabel text="Return">-->
    <!--            <MyInput-->
    <!--              name="return"-->
    <!--              type="date"-->
    <!--              required-->
    <!--              :model-value="formatDate(clickedBooking?.returnDate)"-->
    <!--            />-->
    <!--          </MyLabel>-->
    <!--          <MyLabel text="Price (per person)">-->
    <!--            <MyInput-->
    <!--              type="number"-->
    <!--              required-->
    <!--              name="price"-->
    <!--              :model-value="clickedBooking?.pricePerPerson.toFixed(2)"-->
    <!--            />-->
    <!--          </MyLabel>-->
    <!--          <MyLabel text="Thumbnail URL" class="mb-4">-->
    <!--            <MyInput name="thumbnail" type="url" v-model="profilePictureURL">-->
    <!--              <template #append>-->
    <!--                <MyImg-->
    <!--                  v-if="profilePictureURL"-->
    <!--                  :src="profilePictureURL"-->
    <!--                  alt="thumbnail"-->
    <!--                  width="80"-->
    <!--                  class="m-2 aspect-square rounded transition-transform hover:scale-150"-->
    <!--                  placeholder=""-->
    <!--                />-->
    <!--              </template>-->
    <!--            </MyInput>-->
    <!--          </MyLabel>-->
    <!--          <MyTextarea-->
    <!--            label="Description"-->
    <!--            type="textarea"-->
    <!--            placeholder="Enter a description"-->
    <!--            name="description"-->
    <!--            :model-value="clickedBooking?.description"-->
    <!--          />-->
    <!--        </form>-->
    <!--      </template>-->

    <!--      <template #actions>-->
    <!--        <MyButton variant="text" @click="isModalOpen = false">Cancel</MyButton>-->
    <!--        <MyButton form="travel-form" type="submit">Save</MyButton>-->
    <!--      </template>-->
    <!--    </BaseModal>-->
  </div>
</template>

<script setup lang="ts">
import { type Booking } from "~/entities/booking/types";
import PaymentTag from "~/components/PaymentTag.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import { BookingRepository } from "~/respositories/BookingRepository";

definePageMeta({
  title: "Bookings",
  description: "This is the bookings page",
});

const bookingRepository = new BookingRepository();
const headers = ["Customer Name", "Email", "Phone", "Travel", "Payment"];
const bookings = ref<Booking[]>([]);
const isModalOpen = ref(false);
const clickedBooking = ref<Booking | null>(null);
const profilePictureURL = ref("");
const bookingForm = ref<HTMLFormElement | null>(null);

onMounted(() => {
  bookings.value = bookingRepository.getAll();
});

const searchValue = ref("");

function handleSubmit() {
  console.log("submitting form");
}

watch(searchValue, (value) => {
  // reset the table if the search value is empty
  if (!value) {
    bookings.value = bookingRepository.getAll();
    return;
  }

  const allCustomers = bookingRepository.getAll();
  bookings.value = allCustomers.filter(
    (t) =>
      t.customer.firstName.toLowerCase().includes(value.toLowerCase()) ||
      t.customer.lastName.toLowerCase().includes(value.toLowerCase()),
  );
});
</script>
