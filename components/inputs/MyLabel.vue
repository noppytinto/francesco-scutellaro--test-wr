<template>
  <label class="cursor-pointer">
    <span class="flex items-center justify-between gap-4">
      <span class="grow basis-0 text-sm text-my-neutral-300" :class="textClass"
        >{{ text }}
      </span>
      <span class="grow-[2] basis-0">
        <slot />
      </span>
    </span>
  </label>
</template>
<script setup lang="ts">
type Props = {
  text: string;
  textClass?: string;
};

defineProps<Props>();
</script>
