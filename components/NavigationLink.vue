<template>
  <NuxtLink :to>
    <div
      class="flex items-center gap-1 rounded-md py-2 text-secondary transition-all duration-150 hover:bg-my-neutral-100"
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
