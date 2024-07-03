<template>
  <NuxtImg
    :src
    :alt
    :width
    :height
    fit="cover"
    loading="lazy"
    :placeholder="[20, 20, 75, 5]"
    @load="handleLoad"
    class="transition-opacity"
    :class="[
      {
        'animate-pulse': isLoading,
        'opacity-0': isLoading,
      },
    ]"
  />
</template>

<script setup lang="ts">
type Props = {
  alt: string;
  src: string;
  width: string;
  height?: string;
};

defineProps<Props>();

const isLoading = ref(true);

const handleLoad = () => {
  isLoading.value = false;
};
</script>
