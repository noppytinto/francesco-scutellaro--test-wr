<template>
  <div
    class="flex items-center gap-4 rounded border border-my-neutral-100 px-2 py-1.5 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:bg-my-neutral-100"
  >
    <div class="flex items-center gap-2">
      <NuxtImg
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt="avatar"
        class="w-7 rounded-full shadow"
      />
      <p class="font-semibold">John Doe</p>
    </div>

    <button>
      <FontAwesomeIcon icon="chevron-down" class="text-secondary" size="sm" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
</script>
