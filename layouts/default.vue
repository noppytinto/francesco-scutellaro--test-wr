<template>
  <div class="flex h-dvh gap-4">
    <Sidebar />

    <div class="flex grow flex-col gap-10 p-4">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-my-neutral-300">
          {{ $route.meta.title }}
        </h1>

        <!--================================================== USER MENU -->
        <UserMenu />
      </header>

      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import UserMenu from "~/components/UserMenu.vue";
</script>
