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
      <MyButton icon="plus" @click="handleAddTravel"> Add Travel </MyButton>
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
        <TableData> ${{ travel.pricePerPerson }} </TableData>
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
            v-if="travel.thumbnailURL"
            icon="check"
            class="text-green-600"
          />
          <FontAwesomeIcon v-else icon="times" class="text-primary" />
        </TableData>
        <TableData>
          <p>
            {{ travel.averageRating ? travel.averageRating : "-" }}
          </p>
        </TableData>
      </template>
    </MyTable>

    <BaseModal title="Test" v-model:open="isModalOpen">
      <template #default>
        <form
          class="flex flex-col gap-8"
          id="travel-form"
          @submit.prevent="handleSubmit"
          ref="travelForm"
        >
          <MyLabel text="Name">
            <MyInput name="name" required :model-value="clickedTravel?.name" />
          </MyLabel>
          <MyLabel text="Departure">
            <MyInput
              name="departure"
              type="date"
              required
              :model-value="formatDate(clickedTravel?.departureDate)"
            />
          </MyLabel>
          <MyLabel text="Return">
            <MyInput
              name="return"
              type="date"
              required
              :model-value="formatDate(clickedTravel?.returnDate)"
            />
          </MyLabel>
          <MyLabel text="Price (per person)">
            <MyInput
              type="number"
              required
              name="price"
              :model-value="clickedTravel?.pricePerPerson.toFixed(2)"
            />
          </MyLabel>
          <MyLabel text="Thumbnail URL" class="mb-4">
            <MyInput name="thumbnail" type="url" v-model="thumbnailUrl">
              <template #append>
                <MyImg
                  v-if="thumbnailUrl"
                  :src="thumbnailUrl"
                  alt="thumbnail"
                  width="80"
                  class="m-2 aspect-square rounded transition-transform hover:scale-150"
                  placeholder=""
                />
              </template>
            </MyInput>
          </MyLabel>
          <MyTextarea
            label="Description"
            type="textarea"
            placeholder="Enter a description"
            name="description"
            :model-value="clickedTravel?.description"
          />
        </form>
      </template>

      <template #actions>
        <MyButton variant="text" @click="isModalOpen = false">Cancel</MyButton>
        <MyButton form="travel-form" type="submit">Save</MyButton>
      </template>
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { getMockedTravels, type Travel } from "~/entities/travel/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import TableData from "~/components/Table/TableData.vue";
import MyTable from "~/components/Table/MyTable.vue";
import TableActions from "~/components/Table/TableActions.vue";
import MyInput from "~/components/inputs/MyInput.vue";
import MyLabel from "~/components/inputs/MyLabel.vue";
import MyTextarea from "~/components/inputs/MyTextarea.vue";

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
  "Rating",
];

const travels = ref<Travel[]>([]);
const searchValue = ref("");
const isModalOpen = ref(false);
const thumbnailUrl = ref("");
const travelForm = ref<HTMLFormElement | null>(null);
const isCreating = ref(false);
const clickedTravel = ref<Travel | null>(null);

onMounted(() => {
  travels.value = getMockedTravels();
});

// ====================================================
// FUNCTIONS
// ====================================================

function handleRowClick(travel: Travel) {
  isModalOpen.value = true;
  isCreating.value = false;
  travelForm.value?.reset();
  thumbnailUrl.value = travel.thumbnailURL;
  clickedTravel.value = toRaw(travel);
}

function handleSubmit() {
  isModalOpen.value = false;

  if (isCreating.value) {
    addTravel();
  } else {
    updateTravel();
  }
}

function handleAddTravel() {
  clickedTravel.value = null;
  thumbnailUrl.value = "";
  travelForm.value?.reset();
  isModalOpen.value = true;
  isCreating.value = true;
}

function addTravel() {
  const formData = new FormData(travelForm.value!);
  const travel: Travel = {
    id: (Math.random() * 1000).toFixed(0),
    name: formData.get("name") as string,
    departureDate: new Date(formData.get("departure") as string),
    returnDate: new Date(formData.get("return") as string),
    pricePerPerson: Number(formData.get("price")),
    description: formData.get("description") as string,
    thumbnailURL: thumbnailUrl.value,
  };

  travels.value.unshift(travel);

  isCreating.value = false;
}

function updateTravel() {
  const formData = new FormData(travelForm.value!);
  const updatedTravel: Travel = {
    ...clickedTravel.value!,
    name: formData.get("name") as string,
    departureDate: new Date(formData.get("departure") as string),
    returnDate: new Date(formData.get("return") as string),
    pricePerPerson: Number(formData.get("price")),
    description: formData.get("description") as string,
    thumbnailURL: thumbnailUrl.value,
  };

  const index = travels.value.findIndex((t) => t.id === updatedTravel.id);

  travels.value[index] = updatedTravel;
}

// convert date to YYYY-MM-DD format
function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

// ====================================================
// WATCHERS
// ====================================================

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
