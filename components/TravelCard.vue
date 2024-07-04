<template>
  <article class="flex flex-col gap-3">
    <div
      class="before:from-3% relative w-max overflow-hidden rounded-lg shadow-md before:absolute before:h-full before:w-full before:bg-gradient-to-t before:from-neutral-950 before:to-transparent before:to-30%"
    >
      <UIImg
        :src="travel.thumbnailURL"
        :alt="travel.name"
        width="200"
        height="200"
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
import { getDifferenceInDays } from "~/utils/date";

type Props = {
  travel: Travel;
};

const props = defineProps<Props>();

const durationInDays = computed(() => {
  const departureDate = props.travel.departureDate;
  const returnDate = props.travel.returnDate;

  const duration = getDifferenceInDays(returnDate, departureDate);
  return `${duration} days`;
});
</script>
