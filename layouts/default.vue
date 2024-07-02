<template>
  <div class="flex h-dvh gap-4">
    <!--================================================== SIDEBAR -->
    <div
      class="flex min-w-[250px] max-w-[250px] flex-col gap-10 border-r border-my-neutral-100 p-4"
    >
      <!--================================================== LOGO -->
      <div class="flex items-center justify-between">
        <NuxtImg src="images/weroad-logo-expanded.svg" alt="logo" width="100" />
        <button>
          <FontAwesomeIcon
            icon="window-maximize"
            class="text-secondary"
            rotation="270"
          />
        </button>
      </div>

      <!--================================================== NAVIGATION -->
      <nav>
        <h1 class="text-sm text-my-neutral-300">Main menu</h1>
        <ul class="flex flex-col gap-1">
          <li>
            <NavigationLink to="/" title="Dashboard" icon="house" />
          </li>
          <li>
            <NavigationLink
              to="/travels"
              title="Travels"
              icon="earth-americas"
            />
          </li>
          <li>
            <NavigationLink
              to="/bookings"
              title="Bookings"
              icon="plane-departure"
            />
          </li>
        </ul>
      </nav>
    </div>

    <!--================================================== RIGHT CONTENT -->
    <div class="flex grow flex-col gap-10 p-4">
      <!--================================================== HEADER -->
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-my-neutral-300">
          {{ $route.meta.title }}
        </h1>

        <!--================================================== AVATAR -->
        <div
          class="flex items-center gap-2.5 rounded border border-my-neutral-300 px-2 py-1.5"
        >
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="avatar"
            class="w-7 rounded-full"
          />
          <p class="font-semibold">John Doe</p>
          <button>
            <FontAwesomeIcon icon="chevron-down" class="text-secondary" />
          </button>
        </div>
      </header>

      <!--================================================== MAIN CONTENT -->

      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavigationLink from "~/components/NavigationLink.vue";
</script>
