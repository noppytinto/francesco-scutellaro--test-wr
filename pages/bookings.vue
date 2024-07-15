<template>
  <div>
    <UITableActions class="mb-4">
      <UISearchInput class="max-w-96 grow" v-model="searchValue" />
      <UIButton icon="plus" @click="handleClickCreate"> Create </UIButton>
    </UITableActions>

    <BookingsTable :bookings="searchResults" @row-click="handleClickRow" />

    <EditBookingModal
      v-model:open="isEditModalOpen"
      :booking="clickedBooking"
      @submit="handleClickSubmit"
    />

    <CreateBookingModal
      v-model:open="isCreateModalOpen"
      @submit="handleClickSubmit"
      class="min-h-[75vh]"
    />
  </div>
</template>

<script setup lang="ts">
import { type Booking } from "~/entities/booking/types";
import BookingsTable from "~/components/booking/BookingsTable.vue";
import UISearchInput from "~/components/ui/UISearchInput.vue";
import UIButton from "~/components/ui/UIButton.vue";
import UITableActions from "~/components/ui/table/UITableActions.vue";
import CreateBookingModal from "~/components/booking/CreateBookingModal.vue";
import EditBookingModal from "~/components/booking/EditBookingModal.vue";
import { useBookingsStore } from "~/store/bookingsStore";

definePageMeta({
  title: "Bookings",
  description: "This is the bookings page",
});

// ====================================================
// STATE & DATA
// ====================================================
const { bookings } = storeToRefs(useBookingsStore());
const searchValue = ref("");
const searchResults = ref<Booking[]>([]);
const clickedBooking = ref<Booking | undefined>(undefined);
const isEditModalOpen = ref(false);
const isCreateModalOpen = ref(false);

// ====================================================
// WATCHERS
// ====================================================
watchEffect(() => {
  searchResults.value = Array.from(bookings.value);
});

watch(searchValue, (value) => {
  // reset the table if the search value is empty
  if (!value) {
    searchResults.value = Array.from(bookings.value);
    return;
  }

  searchResults.value = bookings.value.filter(
    (b) =>
      b.customer.firstName.toLowerCase().includes(value.toLowerCase()) ||
      b.customer.lastName.toLowerCase().includes(value.toLowerCase()),
  );
});

// ====================================================
// FUNCTIONS
// ====================================================
function handleClickRow(booking: Booking) {
  isEditModalOpen.value = true;
  clickedBooking.value = toRaw(booking);
}

function handleClickCreate() {
  clickedBooking.value = undefined;
  isCreateModalOpen.value = true;
}

function handleClickSubmit() {}
</script>
