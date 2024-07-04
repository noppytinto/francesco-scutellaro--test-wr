<template>
  <button
    :type
    :form
    class="rounded-md px-4 py-2 font-semibold transition-all duration-100 ease-in-out focus:outline-none active:scale-95"
    :class="{
      'bg-primary text-white hover:shadow-lg active:shadow-none':
        variant === 'filled',
      'border border-primary bg-transparent text-primary hover:shadow-lg active:shadow-none':
        variant === 'outlined',
      'text-primary duration-200 hover:bg-my-neutral-50': variant === 'text',
      'text-my-neutral-300 duration-200 hover:text-primary':
        variant === 'iconOnly',
      'cursor-not-allowed bg-my-neutral-100 opacity-50 hover:shadow-none active:scale-100':
        disabled,
    }"
    :disabled
  >
    <FontAwesomeIcon
      v-if="icon"
      :icon
      :class="{
        'mr-2': variant !== 'iconOnly',
      }"
      :size="iconSize"
    />
    <slot v-if="variant !== 'iconOnly'" />
  </button>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Variant = "filled" | "outlined" | "text" | "iconOnly";

type Props = {
  icon?: string;
  variant?: Variant;
  form?: string;
  type?: "button" | "submit" | "reset";
  iconSize?: "xs" | "sm" | "lg" | "xl";
  disabled?: boolean;
};

withDefaults(defineProps<Props>(), {
  variant: "filled",
  type: "button",
});
</script>
