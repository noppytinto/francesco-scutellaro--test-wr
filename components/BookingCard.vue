<template>
  <article
    class="flex justify-between gap-4 rounded-lg border border-my-neutral-100 p-2"
  >
    <div class="flex grow flex-col gap-2">
      <h1 class="line-clamp-1 font-semibold">
        {{ booking.customer.firstName }} {{ booking.customer.lastName }}
      </h1>
      <p class="line-clamp-1 text-sm text-my-neutral-300">
        {{ booking.travel.name }}
      </p>
      <p>
        <PaymentTag :paymentMethod="booking.paymentMethod" />
      </p>
    </div>
    <div class="relative">
      <UIImg
        :src="booking.customer.profilePicture"
        :alt="booking.customer.firstName"
        width="40"
        height="40"
        class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/4 rounded-full border-4 border-white shadow-lg transition-all hover:scale-150 hover:shadow-lg"
      />
      <UIImg
        :src="booking.travel.thumbnailURL"
        :alt="booking.travel.name"
        width="80"
        height="80"
        class="aspect-square min-w-[80px] rounded-lg"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Booking } from "~/entities/booking/types";
import PaymentTag from "~/components/PaymentTag.vue";

type Props = {
  booking: Booking;
};

defineProps<Props>();
</script>
