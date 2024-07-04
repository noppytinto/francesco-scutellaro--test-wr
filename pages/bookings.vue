<template>
  <div>
    <UITableActions class="mb-4">
      <UISearchInput class="max-w-96 grow" v-model="searchValue" />
      <UIButton icon="plus" @click="handleClickAddBooking">
        Add Booking
      </UIButton>
    </UITableActions>

    <BookingsTable :bookings="bookings" @row-click="handleClickRow" />

    <EditBookingModal
      v-model:open="isEditModalOpen"
      :booking="clickedBooking"
      @submit="handleClickSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { type Booking } from "~/entities/booking/types";
import { BookingRepository } from "~/respositories/BookingRepository";
import BookingsTable from "~/components/booking/BookingsTable.vue";
import UISearchInput from "~/components/ui/UISearchInput.vue";
import EditBookingModal from "~/components/booking/EditBookingModal.vue";

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

function handleClickSubmit() {
  // refresh the table
  bookings.value = bookingRepository.getAll();
}
</script>
