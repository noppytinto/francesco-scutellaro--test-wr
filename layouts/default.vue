<template>
  <div class="flex gap-4">
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

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  //filter: grayscale(1);
}

.layout-enter-active,
.layout-leave-active {
  transition: all 0.1s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  //filter: grayscale(1);
}
</style>
