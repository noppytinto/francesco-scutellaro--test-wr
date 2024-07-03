<template>
  <article
    class="flex justify-between gap-4 rounded-lg border border-my-neutral-300 p-2.5"
  >
    <div class="flex grow flex-col gap-2">
      <h1 class="line-clamp-1 font-semibold">
        {{ booking.customer.firstName }} {{ booking.customer.lastName }}
      </h1>
      <p class="line-clamp-1 text-sm text-my-neutral-300">
        {{ booking.travel.name }}
      </p>
      <p class="line-clamp-1 text-sm font-semibold text-my-neutral-300">
        {{ booking.paymentMethod }}
      </p>
    </div>
    <div class="relative">
      <NuxtImg
        :src="booking.customer.profilePicture"
        :alt="booking.customer.firstName"
        fit="cover"
        width="40"
        height="40"
        class="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/4 rounded-full border-4 border-white shadow-lg"
        loading="lazy"
        :placeholder="[5, 5, 75, 5]"
      />
      <NuxtImg
        :src="booking.travel.thumbnail"
        :alt="booking.travel.name"
        fit="cover"
        width="80"
        height="80"
        class="aspect-square min-w-[80px] rounded-lg"
        loading="lazy"
        :placeholder="[10, 10, 75, 5]"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Booking } from "~/entities/booking/types";

type Props = {
  booking: Booking;
};

defineProps<Props>();
</script>
