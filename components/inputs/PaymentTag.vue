<template>
  <span
    class="rounded px-2 py-1 text-xs font-semibold text-white"
    :class="{
      'bg-green-600': paymentMethod === 'Credit transfer',
      'bg-gradient-to-r from-blue-500 to-rose-500': paymentMethod === 'Revolut',
      'bg-blue-600': paymentMethod === 'Paypal',
    }"
  >
    {{ paymentMethod }}
  </span>
</template>

<script setup lang="ts">
import type { PaymentMethod } from "~/entities/booking/types";

type Props = {
  paymentMethod: PaymentMethod;
};

defineProps<Props>();
</script>
