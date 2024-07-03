<template>
  <div>
    <TableActions class="mb-4">
      <MyInput
        type="search"
        placeholder="search"
        icon="magnifying-glass"
        class="max-w-96 grow"
        v-model="searchValue"
      />
      <MyButton icon="plus"> Add Travel </MyButton>
    </TableActions>
    <!--======== travels table ========-->
    <MyTable
      :headers
      :data="travels"
      row-class="cursor-pointer"
      @row-click="handleRowClick"
    >
      <template #default="{ value: travel }">
        <TableData>{{ travel.name }}</TableData>
        <TableData>
          {{ formatDate(travel.departureDate) }}
        </TableData>
        <TableData>
          {{ formatDate(travel.returnDate) }}
        </TableData>
        <TableData>
          {{ travel.pricePerPerson }}
        </TableData>
        <TableData>
          <FontAwesomeIcon
            v-if="travel.description"
            icon="check"
            class="text-green-600"
          />
          <FontAwesomeIcon v-else icon="times" class="text-primary" />
        </TableData>
        <TableData>
          <FontAwesomeIcon
            v-if="travel.thumbnail"
            icon="check"
            class="text-green-600"
          />
          <FontAwesomeIcon v-else icon="times" class="text-primary" />
        </TableData>
        <TableData> ${{ travel.pricePerPerson }} </TableData>
        <TableData>
          <p>
            {{ travel.averageRating ? travel.averageRating : "-" }}
          </p>
        </TableData>
      </template>
    </MyTable>

    <BaseModal title="Test" v-model:open="isModalOpen">
      <template #default>
        <p>Modal content</p>
      </template>

      <template #actions>
        <MyButton variant="text" @click="isModalOpen = false">Cancel</MyButton>
        <MyButton>Save</MyButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { getMockedTravels, type Travel } from "~/entities/travel/types";
import { formatDate } from "compatx";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TableData from "~/components/Table/TableData.vue";
import MyTable from "~/components/Table/MyTable.vue";
import TableActions from "~/components/Table/TableActions.vue";
import MyInput from "~/components/inputs/MyInput.vue";

definePageMeta({
  title: "Travels",
  description: "This is the travels page",
});

const headers = [
  "Name",
  "Departure",
  "Return",
  "Price (per person)",
  "Description",
  "Thumbnail",
  "Price",
  "Rating",
];

const travels = ref<Travel[]>([]);
const searchValue = ref("");
const isModalOpen = ref(false);

onMounted(() => {
  travels.value = getMockedTravels();
});

const handleRowClick = (travel: Travel) => {
  isModalOpen.value = true;
};

watch(searchValue, (value) => {
  // reset the table if the search value is empty
  if (!value) {
    travels.value = getMockedTravels();
    return;
  }

  const allTravels = getMockedTravels();
  travels.value = allTravels.filter((t) =>
    t.name.toLowerCase().includes(value.toLowerCase()),
  );
});
</script>
