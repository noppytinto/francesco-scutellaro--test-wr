<template>
  <section>
    <header class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <NuxtLink
        v-if="seeAllLink"
        :to="seeAllLink"
        class="text-sm underline transition-colors duration-100 ease-in-out hover:text-primary"
      >
        see all
      </NuxtLink>
    </header>

    <slot />
  </section>
</template>

<script setup lang="ts">
type Props = {
  title: string;
  seeAllLink?: string;
};

defineProps<Props>();
</script>
