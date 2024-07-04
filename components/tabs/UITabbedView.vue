<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="flex border-b border-gray-300">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          @click="handleClickTab(tab)"
          :class="{
            'font-semibold text-black': currentActiveTab === tab.id,
            'bg-white': currentActiveTab !== tab.id,
            'cursor-pointer': !props.disableTabClick,
          }"
          class="relative px-10 py-4 text-my-neutral-300"
        >
          {{ tab.title }}

          <!-- active indicator -->
          <span
            class="absolute bottom-0 right-1/2 flex h-5 w-5 translate-x-1/2 translate-y-1/2 items-center justify-center"
          >
            <span
              class="absolute inline-flex h-full w-full rounded-full opacity-50"
              :class="{
                'animate-pulse bg-primary opacity-100':
                  currentActiveTab === tab.id,
                'opacity-0': currentActiveTab !== tab.id,
              }"
            ></span>
            <span
              class="relative inline-flex h-3 w-3 rounded-full"
              :class="{
                'bg-primary': currentActiveTab === tab.id,
                'bg-my-neutral-100': currentActiveTab !== tab.id,
              }"
            ></span>
          </span>
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
  disableTabClick?: boolean;
};
const props = defineProps<Props>();

const currentActiveTab = defineModel<number>("currentActiveTab", {
  default: 0,
  required: true,
});

const handleClickTab = (tab: Tab) => {
  if (props.disableTabClick) return;

  currentActiveTab.value = tab.id;
};
</script>

<style>
s .slide-left-enter-active {
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
