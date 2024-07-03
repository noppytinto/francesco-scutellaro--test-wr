<template>
  <NuxtLink
    :to
    class="underline transition-colors duration-100 ease-in-out hover:text-primary"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
type Props = {
  to: string;
};

defineProps<Props>();
</script>
