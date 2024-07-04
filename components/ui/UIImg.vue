<template>
  <NuxtImg
    :src
    :alt
    :width
    :height
    :fit
    :placeholder
    @load="handleLoad"
    :preload
  />
</template>

<script setup lang="ts">
type Props = {
  alt: string;
  src: string;
  width: string;
  height?: string;
  placeholder?: string | number[];
  preload?: boolean;
  fit?: "fill" | "contain" | "cover" | "inside" | "outside";
};

withDefaults(defineProps<Props>(), {
  placeholder: () => [20, 20, 75, 5],
  fit: "cover",
});

const isLoading = ref(true);

const handleLoad = () => {
  isLoading.value = false;
};
</script>
