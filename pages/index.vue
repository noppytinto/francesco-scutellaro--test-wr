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

    <!-- ==================== Recent bookings ====================-->
    <DashboardSection title="Recent bookings" seeAllLink="/bookings">
      <ul
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5"
      >
        <li v-for="booking in recentBookings" :key="booking.id">
          <BookingCard :booking="booking" />
        </li>
      </ul>
    </DashboardSection>

    <!-- ==================== Latest added travels ====================-->
    <DashboardSection title="Latest added travels" seeAllLink="/travels">
      <ul
        class="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7"
      >
        <li v-for="travel in recentTravels" :key="travel.id">
          <TravelCard :travel="travel" />
        </li>
      </ul>
    </DashboardSection>
  </div>
</template>

<script setup lang="ts">
import DashboardSection from "~/components/dashboard/DashboardSection.vue";
import DashboardWidget from "~/components/dashboard/DashboardWidget.vue";
import { useBookingsStore } from "~/store/bookingsStore";
import { useTravelsStore } from "~/store/travelsStore";

definePageMeta({
  title: "Dashboard",
  description: "Dashboard page",
});

const { travels } = storeToRefs(useTravelsStore());
const { bookings } = storeToRefs(useBookingsStore());
const totalRevenue = computed(() => {
  const tot = bookings.value?.reduce((acc, booking) => {
    return acc + booking.travel.pricePerPerson;
  }, 0);

  return tot ? `$${tot}` : "";
});
const totalTravels = computed(() => String(travels.value?.length) || "");
const totalBookings = computed(() => String(bookings.value?.length) || "");
const recentBookings = computed(() => bookings.value?.slice(-5).reverse());
const recentTravels = computed(() => travels.value?.slice(-6).reverse());
</script>
