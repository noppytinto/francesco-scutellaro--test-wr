<template>
  <label class="flex cursor-pointer flex-col gap-4">
    <span class="text-sm text-my-neutral-300">
      {{ label }}
    </span>
    <textarea
      v-model="modelValue"
      class="w-full resize-none rounded-md bg-my-neutral-50 px-3 py-2 focus-within:ring-1 focus-within:ring-tertiary focus:outline-none"
      :placeholder
      :name
      rows="5"
    />
  </label>
</template>

<script setup lang="ts">
import { defineModel } from "vue";

type Props = {
  label: string;
  placeholder?: string;
  name?: string;
};

defineProps<Props>();

const modelValue = defineModel<string>();
</script>
