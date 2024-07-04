<template>
  <UIBaseInput class="flex items-center pr-2">
    <FontAwesomeIcon v-if="icon" :icon class="ml-3 text-gray-500" />
    <select
      v-model="modelValue"
      :required
      :name
      :type
      class="w-full rounded-md bg-transparent px-3 py-2 focus:outline-none"
    >
      <slot />
    </select>

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
};

withDefaults(defineProps<Props>(), {
  type: "text",
});

const modelValue = defineModel<string>();
</script>
