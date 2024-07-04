<template>
  <UIBaseInput class="flex items-center">
    <FontAwesomeIcon v-if="icon" :icon class="ml-3 text-gray-500" />
    <input
      v-model="modelValue"
      :type
      class="w-full rounded-md bg-transparent px-3 py-2 focus:outline-none"
      :placeholder
      :required
      :name
      :min
      :max
    />
    <slot name="append" />
  </UIBaseInput>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import UIBaseInput from "~/components/ui/inputs/UIBaseInput.vue";

type Props = {
  icon?: string | [string, string];
  type?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  min?: number;
  max?: number;
};

withDefaults(defineProps<Props>(), {
  type: "text",
});

const modelValue = defineModel<string>();
</script>
