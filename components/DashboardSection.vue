<template>
  <section>
    <header class="mb-6 flex items-center justify-between">
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
      <MyLink v-if="seeAllLink" :to="seeAllLink" class="text-sm">
        see all
      </MyLink>
    </header>

    <slot />
  </section>
</template>

<script setup lang="ts">
import MyLink from "~/components/MyLink.vue";

type Props = {
  title: string;
  seeAllLink?: string;
};

defineProps<Props>();
</script>
