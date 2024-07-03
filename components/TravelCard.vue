<template>
  <article class="flex flex-col gap-1">
    <div
      class="before:from-3% relative w-max overflow-hidden rounded-lg shadow-lg before:absolute before:h-full before:w-full before:bg-gradient-to-t before:from-neutral-950 before:to-transparent before:to-30%"
    >
      <NuxtImg
        :src="travel.thumbnail"
        :alt="travel.name"
        fit="cover"
        width="200"
        height="200"
        loading="lazy"
        :placeholder="[20, 20, 75, 5]"
      />
      <p class="absolute bottom-0 p-3 text-white">
        {{ durationInDays }}
      </p>
    </div>

    <div>
      <h1 class="font-semibold">
        {{ travel.name }}
      </h1>
      <p class="text-sm text-my-neutral-300">
        starting from: ${{ travel.pricePerPerson }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Travel } from "~/entities/travel/types";

type Props = {
  travel: Travel;
};

const props = defineProps<Props>();

const durationInDays = computed(() => {
  const departureDate = props.travel.departureDate;
  const returnDate = props.travel.returnDate;

  const duration = differenceInDays(returnDate, departureDate);
  return `${duration} days`;
});

function differenceInDays(date1: Date, date2: Date) {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
</script>
