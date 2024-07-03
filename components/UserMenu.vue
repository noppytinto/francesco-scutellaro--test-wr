<template>
  <div
    class="flex items-center gap-4 rounded border border-my-neutral-100 px-2 py-1.5 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:border-tertiary hover:bg-my-neutral-50"
  >
    <div class="flex items-center gap-2">
      <MyImg
        src="https://randomuser.me/api/portraits/men/1.jpg"
        alt="avatar"
        width="25"
        height="25"
        class="rounded-full shadow"
      />
      <p class="text-sm font-semibold">John Doe</p>
    </div>

    <button>
      <FontAwesomeIcon icon="chevron-down" class="text-secondary" size="sm" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import MyImg from "~/components/MyImg.vue";
</script>
