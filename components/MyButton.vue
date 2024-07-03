<template>
  <button
    class="rounded-md px-4 py-2 font-semibold transition-all duration-100 ease-in-out hover:shadow-lg focus:outline-none active:scale-95 active:shadow-none"
    :class="{
      'bg-primary text-white': variant === 'filled',
      'border border-primary bg-transparent text-primary':
        variant === 'outlined',
      'text-primary duration-200 hover:bg-my-neutral-50 hover:shadow-none':
        variant === 'text',
    }"
    @click="$emit('click')"
  >
    <FontAwesomeIcon v-if="icon" :icon class="mr-2" />
    <slot />
  </button>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Variant = "filled" | "outlined" | "text";

type Props = {
  icon?: string;
  variant?: Variant;
};

withDefaults(defineProps<Props>(), {
  variant: "filled",
});
</script>
