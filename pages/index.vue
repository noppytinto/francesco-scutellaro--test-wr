<template>
  <div class="flex flex-col gap-16 pb-20">
    <div class="flex flex-wrap items-end gap-10">
      <DashboardWidget title="Total revenue" :data-value="totalRevenue" />
      <DashboardWidget
        title="travels"
        :data-value="totalTravels"
        color="tertiary"
      />
      <DashboardWidget
        title="bookings"
        :data-value="totalBookings"
        color="tertiary"
      />
    </div>

    <DashboardSection title="Recent bookings" seeAllLink="/bookings">
      <ul
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5"
      >
        <li v-for="booking in bookings?.slice(0, 5)" :key="booking.id">
          <BookingCard :booking="booking" />
        </li>
      </ul>
    </DashboardSection>

    <DashboardSection title="Latest added travels" seeAllLink="/travels">
      <ul
        class="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7"
      >
        <li v-for="travel in travels?.slice(0, 6)" :key="travel.id">
          <TravelCard :travel="travel" />
        </li>
      </ul>
    </DashboardSection>
  </div>
</template>

<script setup lang="ts">
import { type Travel } from "~/entities/travel/types";
import DashboardSection from "~/components/DashboardSection.vue";
import { type Booking } from "~/entities/booking/types";
import DashboardWidget from "~/components/DashboardWidget.vue";
import { TravelRepository } from "~/respositories/TravelRepository";
import { BookingRepository } from "~/respositories/BookingRepository";

definePageMeta({
  title: "Dashboard",
  description: "Dashboard page",
});

const travels = ref<Travel[]>();
const bookings = ref<Booking[]>();
const totalRevenue = computed(() => {
  const tot = bookings.value?.reduce((acc, booking) => {
    return acc + booking.travel.pricePerPerson;
  }, 0);

  return tot ? `$${tot}` : "";
});
const totalTravels = computed(() => String(travels.value?.length) || "");
const totalBookings = computed(() => String(bookings.value?.length) || "");

watchEffect(async () => {
  const travelRepository = new TravelRepository();
  travels.value = travelRepository.getAll();

  const bookingRepository = new BookingRepository();
  bookings.value = bookingRepository.getAll();
});
</script>
