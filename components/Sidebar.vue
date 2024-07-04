<template>
  <div
    class="bg-my-neutral-200 flex min-h-full min-w-[250px] flex-col gap-4 border-r border-my-neutral-100 p-4 transition-all duration-200"
    ref="sidebar"
  >
    <!--================================================== LOGO -->
    <div
      class="flex items-center justify-between"
      :class="{
        'flex-col gap-4': isCollapsed,
      }"
    >
      <UIImg
        v-if="isCollapsed"
        src="images/weroad-logo-collapsed.svg"
        alt="logo"
        width="40"
        preload
      />
      <UIImg
        v-else
        src="images/weroad-logo-expanded.svg"
        alt="logo"
        width="80"
        preload
      />
      <button @click="handleClickCollapse">
        <FontAwesomeIcon
          :icon="isCollapsed ? 'far fa-window-maximize' : 'window-maximize'"
          rotation="270"
          :class="[
            isCollapsed
              ? 'text-my-neutral-100 transition-colors hover:text-my-neutral-300'
              : 'text-my-neutral-300',
          ]"
        />
      </button>
    </div>

    <!--================================================== NAVIGATION -->
    <nav class="sticky top-0 py-5">
      <h1 v-if="!isCollapsed" class="text-sm text-my-neutral-300">Main menu</h1>
      <ul
        class="flex flex-col gap-1"
        :class="{
          'gap-4': isCollapsed,
        }"
      >
        <li>
          <UINavigationLink
            to="/"
            title="Dashboard"
            icon="house"
            :icon-only="isCollapsed"
          />
        </li>
        <li>
          <UINavigationLink
            to="/travels"
            title="Travels"
            icon="earth-americas"
            :icon-only="isCollapsed"
          />
        </li>
        <li>
          <UINavigationLink
            to="/bookings"
            title="Bookings"
            icon="plane-departure"
            :icon-only="isCollapsed"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import UINavigationLink from "~/components/ui/UINavigationLink.vue";

const sidebar = ref<HTMLElement | null>(null);
const isCollapsed = ref<boolean>(false);

onMounted(() => {
  // if is mobile viewport, collapse the sidebar
  if (window.innerWidth < 768) {
    isCollapsed.value = true;
    collapseSidebar();
  }
});

const handleClickCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  collapseSidebar();
};

function collapseSidebar() {
  sidebar.value?.classList.toggle("min-w-[250px]");
  sidebar.value?.classList.toggle("min-w-[max-content]");
  sidebar.value?.classList.toggle("px-3");
}
</script>
