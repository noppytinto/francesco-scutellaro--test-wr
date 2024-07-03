<template>
  <NuxtLink :to>
    <div
      class="flex items-center gap-1 rounded-md py-2 text-secondary transition-colors hover:bg-my-neutral-100"
      :class="{
        'justify-center': !title,
        'bg-my-neutral-50': $route.path === to,
      }"
    >
      <FontAwesomeIcon
        :icon
        class="basis-1/5"
        :class="[
          {
            'text-primary': $route.path === to,
            'text-secondary': $route.path !== to,
          },
          iconClass,
        ]"
        size="lg"
      />
      <p
        v-if="title"
        :class="[
          {
            'font-bold': $route.path === to,
          },
          titleClass,
        ]"
      >
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
  iconClass?: string;
  titleClass?: string;
};

defineProps<Props>();
</script>
