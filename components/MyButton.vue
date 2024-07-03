<template>
  <button
    class="rounded-md bg-primary px-4 py-2 font-semibold text-white transition duration-300 ease-in-out hover:shadow-lg focus:outline-none active:scale-95 active:shadow-none"
    @click="$emit('click')"
  >
    <FontAwesomeIcon v-if="icon" :icon class="mr-2" />
    <slot />
  </button>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Props = {
  icon?: string;
};

defineProps<Props>();
</script>
