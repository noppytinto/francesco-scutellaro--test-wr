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

    <BookingsTable :bookings="bookings" @row-click="handleClickRow" />
  </div>
</template>

<script setup lang="ts">
import { type Booking } from "~/entities/booking/types";
import PaymentTag from "~/components/booking/PaymentTag.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import { BookingRepository } from "~/respositories/BookingRepository";
import BookingsTable from "~/components/booking/BookingsTable.vue";
import TravelsTable from "~/components/travel/TravelsTable.vue";
import type { Travel } from "~/entities/travel/types";

definePageMeta({
  title: "Bookings",
  description: "This is the bookings page",
});

// ====================================================
// STATE & DATA
// ====================================================
const bookingRepository = new BookingRepository();
const bookings = ref<Booking[]>([]);
const searchValue = ref("");
const clickedBooking = ref<Booking | undefined>(undefined);
const isEditModalOpen = ref(false);
const isCreateModalOpen = ref(false);

// ====================================================
// LIFECYCLE
// ====================================================
onMounted(() => {
  bookings.value = bookingRepository.getAll();
});

// ====================================================
// WATCHERS
// ====================================================
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

// ====================================================
// FUNCTIONS
// ====================================================
function handleClickRow(booking: Booking) {
  isEditModalOpen.value = true;
  clickedBooking.value = toRaw(booking);
}

function handleClickAddBooking() {
  clickedBooking.value = undefined;
  isCreateModalOpen.value = true;
}

function handleSubmit() {
  // refresh the table
  bookings.value = bookingRepository.getAll();
}
</script>
