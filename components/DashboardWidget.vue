<template>
  <article
    class="flex flex-col rounded-md bg-my-neutral-50 px-6 py-4 transition-shadow hover:shadow-lg"
  >
    <h1 class="text-my-neutral-900 font-bold" :class="titleClasses">
      {{ title }}
    </h1>
    <p
      class="font-bold"
      :class="[
        dataValueClasses,
        {
          'text-primary': color === 'primary',
          'text-tertiary': color === 'tertiary',
        },
      ]"
    >
      {{ dataValue }}
    </p>
  </article>
</template>

<script setup lang="ts">
type Size = "medium" | "large";
type Color = "primary" | "tertiary";

type Props = {
  title: string;
  dataValue: string;
  size?: Size;
  color?: Color;
};

const props = withDefaults(defineProps<Props>(), {
  size: "large",
  color: "primary",
});

const titleClasses = computed(() => {
  return {
    "text-3xl": props.size === "large",
    "text-xl": props.size === "medium",
  };
});

const dataValueClasses = computed(() => {
  return {
    "text-3xl": props.size === "large",
    "text-xl": props.size === "medium",
  };
});
</script>
