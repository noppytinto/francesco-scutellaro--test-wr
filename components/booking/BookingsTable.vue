<template>
  <UITable
    :headers
    :data="bookings"
    row-class="cursor-pointer"
    @row-click="(ev) => $emit('row-click', ev)"
  >
    <template #default="{ value: booking }">
      <UITableData class="flex items-center gap-3">
        <UIImg
          :src="booking.customer.profilePicture"
          alt="profile picture"
          class="b aspect-square rounded-full shadow-md transition-transform hover:scale-150"
          width="30"
          height="30"
          fit="fill"
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
</template>
<script setup lang="ts">
import UITableData from "~/components/ui/table/UITableData.vue";
import UITable from "~/components/ui/table/UITable.vue";
import type { Booking } from "~/entities/booking/types";
import PaymentTag from "~/components/booking/PaymentTag.vue";

type Props = {
  bookings: Booking[];
};

defineProps<Props>();

const headers = ["Customer Name", "Email", "Phone", "Travel", "Payment"];

type Emit = {
  (event: "row-click", booking: Booking): void;
};

defineEmits<Emit>();
</script>
