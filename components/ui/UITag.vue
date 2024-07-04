<template>
  <span
    class="rounded px-2 py-1 text-xs font-semibold text-white"
    :class="{
      shine: enableShine,
    }"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
type Props = {
  enableShine?: boolean;
};

defineProps<Props>();
</script>

<style scoped lang="scss">
.shine {
  -webkit-mask-image: linear-gradient(
    45deg,
    #000 25%,
    rgba(0, 0, 0, 0.2) 50%,
    #000 75%
  );
  mask-image: linear-gradient(
    45deg,
    #000 25%,
    rgba(0, 0, 0, 0.2) 50%,
    #000 75%
  );
  -webkit-mask-size: 800%;
  mask-size: 800%;
  -webkit-mask-position: 0;
  mask-position: 0;
}

.shine:hover {
  transition:
    mask-position 2s ease,
    -webkit-mask-position 2s ease;
  -webkit-mask-position: 120%;
  mask-position: 120%;
  opacity: 1;
}
</style>
