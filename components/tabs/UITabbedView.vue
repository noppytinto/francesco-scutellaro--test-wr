<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="flex">
        <div
          v-for="(tab, index) in tabs"
          :key="tab.id"
          @click="handleClickTab(tab)"
          :class="{
            'bg-gray-200': currentActiveTab === tab.id,
            'bg-white': currentActiveTab !== tab.id,
            'border-r border-gray-300': index !== tabs.length - 1,
          }"
          class="cursor-pointer px-10 py-2"
        >
          {{ tab.title }}
        </div>
      </div>
      <Transition name="slide-left" mode="out-in">
        <div :key="currentActiveTab" class="mt-4">
          <slot :activeTab="currentActiveTab" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from "~/components/tabs/types";

type Props = {
  tabs: Tab[];
};
defineProps<Props>();

const currentActiveTab = defineModel<number>("currentActiveTab", {
  default: 0,
  required: true,
});

const handleClickTab = (tab: Tab) => {
  currentActiveTab.value = tab.id;
};
</script>

<style>
.slide-left-enter-active {
  transition: all 0.2s ease-out;
}

.slide-left-leave-active {
  transition: all 0.2s ease-in;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
