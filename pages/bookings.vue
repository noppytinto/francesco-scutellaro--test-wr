<template>
  <div>
    <TableActions class="mb-4">
      <MyInput
        type="search"
        placeholder="search"
        icon="magnifying-glass"
        class="max-w-96 grow"
        v-model="searchValue"
      />
      <MyButton icon="plus"> Add Booking </MyButton>
    </TableActions>

    <!--======== travels table ========-->
    <MyTable :headers :data="bookings" row-class="cursor-pointer">
      <template #default="{ value: booking }">
        <TableData class="flex items-center gap-3">
          <MyImg
            :src="booking.customer.profilePicture"
            alt="profile picture"
            class="b rounded-full shadow-md transition-transform hover:scale-150"
            width="30"
            height="30"
          />
          <p>
            {{ booking.customer.firstName + " " + booking.customer.lastName }}
          </p>
        </TableData>

        <TableData>{{ booking.customer.email }}</TableData>

        <TableData>{{ booking.customer.phoneNumber }}</TableData>

        <TableData>{{ booking.travel.name }}</TableData>

        <TableData>
          <PaymentTag :paymentMethod="booking.paymentMethod" />
        </TableData>
      </template>
    </MyTable>
  </div>
</template>

<script setup lang="ts">
import MyTable from "~/components/Table/MyTable.vue";
import TableData from "~/components/Table/TableData.vue";
import { type Booking, getMockedBookings } from "~/entities/booking/types";
import PaymentTag from "~/components/inputs/PaymentTag.vue";
import TableActions from "~/components/Table/TableActions.vue";
import MyInput from "~/components/inputs/MyInput.vue";

definePageMeta({
  title: "Bookings",
  description: "This is the bookings page",
});

const headers = ["Customer Name", "Email", "Phone", "Travel", "Payment"];
const bookings = ref<Booking[]>([]);

onMounted(() => {
  bookings.value = getMockedBookings();
});

const searchValue = ref("");

watch(searchValue, (value) => {
  // reset the table if the search value is empty
  if (!value) {
    bookings.value = getMockedBookings();
    return;
  }

  const allCustomers = getMockedBookings();

  bookings.value = allCustomers.filter(
    (t) =>
      t.customer.firstName.toLowerCase().includes(value.toLowerCase()) ||
      t.customer.lastName.toLowerCase().includes(value.toLowerCase()),
  );
});
</script>
