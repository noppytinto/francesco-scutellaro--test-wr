<template>
  <div
    class="flex items-center rounded-md bg-my-neutral-50 px-3 focus-within:ring-1 focus-within:ring-tertiary"
  >
    <FontAwesomeIcon v-if="icon" :icon class="text-gray-500" />
    <input
      v-model="value"
      :type
      class="w-full rounded-md bg-transparent px-3 py-2 focus:outline-none"
      :placeholder
    />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Props = {
  icon?: string;
  type?: string;
  placeholder?: string;
};

withDefaults(defineProps<Props>(), {
  type: "text",
});

const value = defineModel<string>();
</script>
