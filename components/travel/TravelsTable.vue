<template>
  <UITable
    :headers
    :data="travels"
    row-class="cursor-pointer"
    @row-click="(ev) => $emit('row-click', ev)"
  >
    <template #default="{ value: travel }">
      <UITableData>{{ travel.name }}</UITableData>
      <UITableData>
        {{ formatDateToDDMMYYYY(travel.departureDate) }}
      </UITableData>
      <UITableData>
        {{ formatDateToDDMMYYYY(travel.returnDate) }}
      </UITableData>
      <UITableData>
        <span class="font-bold text-green-700"> $ </span>

        {{ travel.pricePerPerson }}
      </UITableData>
      <UITableData>
        <FontAwesomeIcon
          v-if="travel.description"
          icon="check"
          class="text-green-600"
        />
        <FontAwesomeIcon v-else icon="times" class="text-primary" />
      </UITableData>
      <UITableData>
        <FontAwesomeIcon
          v-if="travel.thumbnailURL"
          icon="check"
          class="text-green-600"
        />
        <FontAwesomeIcon v-else icon="times" class="text-primary" />
      </UITableData>
      <UITableData>
        <p>
          {{ travel.averageRating ? travel.averageRating : "-" }}
        </p>
      </UITableData>
    </template>
  </UITable>
</template>
<script setup lang="ts">
import { formatDateToDDMMYYYY } from "~/utils/date";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import UITableData from "~/components/ui/table/UITableData.vue";
import UITable from "~/components/ui/table/UITable.vue";
import type { Travel } from "~/entities/travel/types";

type Props = {
  travels: Travel[];
};

defineProps<Props>();

const headers = [
  "Name",
  "Departure",
  "Return",
  "Price (per person)",
  "Description",
  "Thumbnail",
  "Rating",
];

type Emit = {
  (event: "row-click", travel: Travel): void;
};

defineEmits<Emit>();
</script>
