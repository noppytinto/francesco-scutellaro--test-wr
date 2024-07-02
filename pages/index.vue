<template>
  <div class="flex flex-col gap-14">
    <DashboardSection title="Recent bookings" seeAllLink="/bookings">
      <ul
        class="grid grid-cols-1 grid-rows-2 gap-14 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-3 lg:grid-rows-1 xl:grid-cols-4"
      >
        <li v-for="booking in bookings" :key="booking.id">
          <BookingCard :booking="booking" />
        </li>
      </ul>
    </DashboardSection>
    <DashboardSection title="Latest added travels" seeAllLink="/travels">
      <ul
        class="grid grid-cols-1 grid-rows-2 gap-14 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-3 lg:grid-rows-1 xl:grid-cols-4 xl:grid-rows-1 2xl:grid-cols-5"
      >
        <li v-for="travel in travels" :key="travel.id">
          <TravelCard :travel="travel" />
        </li>
      </ul>
    </DashboardSection>
  </div>
</template>

<script setup lang="ts">
import { getMockedTravels } from "~/entities/travel/types";
import DashboardSection from "~/components/DashboardSection.vue";
import { getMockedBookings } from "~/entities/booking/types";

definePageMeta({
  title: "Dashboard",
  description: "This is the hello page",
});

// get first 5
const travels = getMockedTravels().slice(0, 5);
const bookings = getMockedBookings().slice(0, 5);
</script>
