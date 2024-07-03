<template>
  <div
    class="bg-my-neutral-200 flex min-h-full min-w-[250px] flex-col gap-4 border-r border-my-neutral-100 p-4 transition-all duration-100"
    ref="sidebar"
  >
    <!--================================================== LOGO -->
    <div
      class="flex items-center justify-between"
      :class="{
        'flex-col gap-4': isCollapsed,
      }"
    >
      <MyImg
        v-if="isCollapsed"
        src="images/weroad-logo-collapsed.svg"
        alt="logo"
        width="40"
      />
      <MyImg
        v-else
        src="images/weroad-logo-expanded.svg"
        alt="logo"
        width="80"
      />
      <button @click="handleClickCollapse">
        <FontAwesomeIcon
          :icon="isCollapsed ? 'far fa-window-maximize' : 'window-maximize'"
          class="text-secondary"
          rotation="270"
          :class="{
            'text-my-neutral-100': isCollapsed,
          }"
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
          <NavigationLink
            to="/"
            :title="isCollapsed ? '' : 'Dashboard'"
            icon="house"
          />
        </li>
        <li>
          <NavigationLink
            to="/travels"
            :title="isCollapsed ? '' : 'Travels'"
            icon="earth-americas"
          />
        </li>
        <li>
          <NavigationLink
            to="/bookings"
            :title="isCollapsed ? '' : 'Bookings'"
            icon="plane-departure"
          />
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavigationLink from "~/components/NavigationLink.vue";

const sidebar = ref<HTMLElement | null>(null);

const isCollapsed = ref<boolean>(false);

const handleClickCollapse = () => {
  isCollapsed.value = !isCollapsed.value;

  sidebar.value?.classList.toggle("min-w-[250px]");
  sidebar.value?.classList.toggle("min-w-[max-content]");
  sidebar.value?.classList.toggle("px-3");
};

// if in is mobile, collapse the sidebar
onMounted(() => {
  if (window.innerWidth < 768) {
    isCollapsed.value = true;
    sidebar.value?.classList.toggle("min-w-[250px]");
    sidebar.value?.classList.toggle("min-w-[max-content]");
    sidebar.value?.classList.toggle("px-3");
  }
});
</script>
