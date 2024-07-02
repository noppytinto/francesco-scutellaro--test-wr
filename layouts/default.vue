<template>
  <div class="flex gap-4 h-dvh">
    <!--================================================== SIDEBAR -->
    <div
      class="flex flex-col gap-14 grow max-w-60 border-my-neutral-100 border-r p-4"
    >
      <!--================================================== LOGO -->
      <div class="flex justify-between items-center">
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
        <h1 class="text-my-neutral-300">Main menu</h1>
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
    <div class="grow p-4">
      <!--================================================== HEADER -->
      <header class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-4 text-my-neutral-300">
          {{ $route.meta.title }}
        </h1>

        <!--================================================== AVATAR -->
        <div class="flex items-center gap-4">
          <p>John Doe</p>
          <img
            src="https://randomuser.me/api/portraits"
            alt="avatar"
            class="w-12 h-12 rounded-full"
          />
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
