<template>
  <div class="flex min-h-dvh gap-4">
    <Sidebar />

    <div class="flex grow flex-col gap-10 p-4">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-my-neutral-300">
          {{ $route.meta.title }}
        </h1>

        <UserMenu />
      </header>

      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import UserMenu from "~/components/UserMenu.vue";
import { TravelRepository } from "~/respositories/TravelRepository";
import { BookingRepository } from "~/respositories/BookingRepository";

onMounted(() => {
  const travelRepository = new TravelRepository();
  travelRepository.init();

  const bookingsRepository = new BookingRepository();
  bookingsRepository.init();
});
</script>

<style lang="scss">
// page transitions
.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  //filter: grayscale(1);
}
</style>
