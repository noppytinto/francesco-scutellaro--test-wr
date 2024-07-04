<template>
  <label class="flex cursor-pointer flex-col gap-4">
    <span class="text-sm text-my-neutral-300">
      {{ label }}
    </span>
    <UIBaseInput class="p-0">
      <textarea
        v-model="modelValue"
        class="w-full resize-none bg-transparent p-2 focus:outline-none focus:ring-0"
        :placeholder
        :name
        rows="5"
      />
    </UIBaseInput>
  </label>
</template>

<script setup lang="ts">
import { defineModel } from "vue";
import UIBaseInput from "~/components/ui/inputs/UIBaseInput.vue";

type Props = {
  label: string;
  placeholder?: string;
  name?: string;
};

defineProps<Props>();

const modelValue = defineModel<string>();
</script>
