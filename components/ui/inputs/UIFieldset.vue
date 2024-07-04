<template>
  <fieldset>
    <legend v-if="legend" class="mb-2 font-semibold text-secondary">
      {{ legend }}
    </legend>
    <div
      class="flex flex-col gap-8 rounded-md p-4 transition-shadow hover:shadow-md"
    >
      <slot />
    </div>
  </fieldset>
</template>
<script setup lang="ts">
type Props = {
  legend?: string;
};

defineProps<Props>();
</script>
