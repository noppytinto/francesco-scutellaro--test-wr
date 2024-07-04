<template>
  <UITag
    enable-shine
    :class="{
      'bg-green-600': paymentMethod === 'Credit transfer',
      'bg-gradient-to-r from-blue-500 to-rose-500': paymentMethod === 'Revolut',
      'bg-blue-600': paymentMethod === 'Paypal',
    }"
  >
    {{ paymentMethod }}
  </UITag>
</template>

<script setup lang="ts">
import type { PaymentMethod } from "~/entities/booking/types";
import UITag from "~/components/ui/UITag.vue";

type Props = {
  paymentMethod: PaymentMethod;
};

defineProps<Props>();
</script>
