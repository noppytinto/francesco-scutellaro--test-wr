<template>
  <span
    v-if="paymentMethod === 'Credit transfer'"
    class="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white"
  >
    {{ paymentMethod }}
  </span>
  <span
    v-else-if="paymentMethod === 'Paypal'"
    class="rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white"
  >
    {{ paymentMethod }}
  </span>
  <span
    v-else-if="paymentMethod === 'Revolut'"
    class="rounded bg-gradient-to-r from-blue-500 to-rose-500 px-2 py-1 text-xs font-semibold text-white"
  >
    {{ paymentMethod }}
  </span>
  <span
    v-else
    class="rounded bg-blue-500 px-2 py-1 text-xs font-semibold text-white"
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
