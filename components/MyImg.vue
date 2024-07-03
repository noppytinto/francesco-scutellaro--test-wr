<template>
  <NuxtImg
    :src
    :alt
    :width
    :height
    fit="cover"
    :placeholder
    @load="handleLoad"
  />
</template>

<script setup lang="ts">
type Props = {
  alt: string;
  src: string;
  width: string;
  height?: string;
  placeholder?: string | number[];
};

withDefaults(defineProps<Props>(), {
  placeholder: () => [20, 20, 75, 5],
});

const isLoading = ref(true);

const handleLoad = () => {
  isLoading.value = false;
};
</script>
