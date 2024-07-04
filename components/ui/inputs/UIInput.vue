<template>
  <div
    class="flex items-center rounded-md bg-my-neutral-50 pl-3 focus-within:ring-1 focus-within:ring-tertiary"
  >
    <FontAwesomeIcon v-if="icon" :icon class="text-gray-500" />
    <input
      v-model="modelValue"
      :type
      class="w-full rounded-md bg-transparent px-3 py-2 focus:outline-none"
      :placeholder
      :required
      :name
    />
    <slot name="append" />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Props = {
  icon?: string;
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
};

withDefaults(defineProps<Props>(), {
  type: "text",
});

const modelValue = defineModel<string>();
</script>
