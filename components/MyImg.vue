<template>
  <NuxtImg
    :src
    :alt
    :width
    :height
    fit="cover"
    loading="lazy"
    :placeholder="[20, 20, 75, 5]"
  />
</template>

<script setup lang="ts">
type Props = {
  alt: string;
  src: string;
  width: string;
  height: string;
};

defineProps<Props>();
</script>
