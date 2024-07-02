<template>
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
          <NavigationLink to="/travels" title="Travels" icon="earth-americas" />
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
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NavigationLink from "~/components/NavigationLink.vue";
</script>
