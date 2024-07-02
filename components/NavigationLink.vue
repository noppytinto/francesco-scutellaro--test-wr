<template>
  <NuxtLink :to>
    <div
      class="flex items-center gap-1 text-secondary py-2 rounded-md hover:bg-my-neutral-100 transition-all duration-150"
    >
      <FontAwesomeIcon
        :icon
        class="basis-1/5"
        :class="{
          'text-primary': $route.path === to,
          'text-secondary': $route.path !== to,
        }"
      />
      <p class="font-semibold">
        {{ title }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type AppRoutes = {
  home: "/";
  travels: "/travels";
  bookings: "/bookings";
};

type Props = {
  to: AppRoutes[keyof AppRoutes];
  title: string;
  icon: string[] | string;
};

defineProps<Props>();
</script>
