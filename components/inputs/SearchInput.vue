<template>
  <div
    class="flex items-center rounded-md bg-my-neutral-50 px-3 focus-within:ring-1 focus-within:ring-tertiary"
  >
    <FontAwesomeIcon icon="magnifying-glass" class="text-gray-500" />
    <input
      v-model="search"
      type="search"
      class="w-full rounded-md bg-transparent px-3 py-2 focus:outline-none"
      placeholder="search"
    />
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const search = defineModel<string>({});
</script>
