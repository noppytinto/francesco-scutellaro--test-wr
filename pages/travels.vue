<template>
  <div>
    <UITableActions class="mb-4">
      <UIInput
        type="search"
        placeholder="search"
        icon="magnifying-glass"
        class="max-w-96 grow"
        v-model="searchValue"
      />
      <UIButton icon="plus" @click="handleAddTravel"> Add Travel </UIButton>
    </UITableActions>

    <!--======== travels table ========-->
    <UITable
      :headers
      :data="travels"
      row-class="cursor-pointer"
      @row-click="handleRowClick"
    >
      <template #default="{ value: travel }">
        <UITableData>{{ travel.name }}</UITableData>
        <UITableData>
          {{ formatDateToDDMMYYYY(travel.departureDate) }}
        </UITableData>
        <UITableData>
          {{ formatDateToDDMMYYYY(travel.returnDate) }}
        </UITableData>
        <UITableData> ${{ travel.pricePerPerson }} </UITableData>
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

    <UIBaseModal title="Test" v-model:open="isModalOpen">
      <template #default>
        <form
          class="flex flex-col gap-8"
          id="travel-form"
          @submit.prevent="handleSubmit"
          ref="travelForm"
        >
          <UILabel text="Name">
            <UIInput name="name" required :model-value="clickedTravel?.name" />
          </UILabel>
          <UILabel text="Departure">
            <UIInput
              name="departure"
              type="date"
              required
              :model-value="
                clickedTravel?.departureDate
                  ? formatDateToDDMMYYYY(clickedTravel?.departureDate)
                  : ''
              "
            />
          </UILabel>
          <UILabel text="Return">
            <UIInput
              name="return"
              type="date"
              required
              :model-value="
                clickedTravel?.returnDate
                  ? formatDateToDDMMYYYY(clickedTravel?.returnDate)
                  : ''
              "
            />
          </UILabel>
          <UILabel text="Price (per person)">
            <UIInput
              type="number"
              required
              name="price"
              :model-value="clickedTravel?.pricePerPerson.toFixed(2)"
            />
          </UILabel>
          <UILabel text="Thumbnail URL" class="mb-4">
            <UIInput name="thumbnail" type="url" v-model="thumbnailUrl">
              <template #append>
                <UIImg
                  v-if="thumbnailUrl"
                  :src="thumbnailUrl"
                  alt="thumbnail"
                  width="80"
                  class="m-2 aspect-square rounded transition-transform hover:scale-150"
                  placeholder=""
                />
              </template>
            </UIInput>
          </UILabel>
          <UITextarea
            label="Description"
            type="textarea"
            placeholder="Enter a description"
            name="description"
            :model-value="clickedTravel?.description"
          />
        </form>
      </template>

      <template #actions>
        <UIButton variant="text" @click="isModalOpen = false">Cancel</UIButton>
        <UIButton form="travel-form" type="submit">Save</UIButton>
      </template>
    </UIBaseModal>
  </div>
</template>

<script setup lang="ts">
import { type Travel } from "~/entities/travel/types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import UIButton from "~/components/ui/UIButton.vue";
import UITableActions from "~/components/ui/table/UITableActions.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import UITable from "~/components/ui/table/UITable.vue";
import UITableData from "~/components/ui/table/UITableData.vue";
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UILabel from "~/components/ui/UILabel.vue";
import UITextarea from "~/components/ui/UITextarea.vue";
import { TravelRepository } from "~/respositories/TravelRepository";
import { formatDateToDDMMYYYY } from "~/utils/date";

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

const travelRepository = new TravelRepository();
const travels = ref<Travel[]>([]);
const searchValue = ref("");
const isModalOpen = ref(false);
const thumbnailUrl = ref("");
const travelForm = ref<HTMLFormElement | null>(null);
const isCreating = ref(false);
const clickedTravel = ref<Travel | null>(null);

onMounted(() => {
  travels.value = travelRepository.getAll();
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

// ====================================================
// WATCHERS
// ====================================================
watch(searchValue, (value) => {
  // reset the table if the search value is empty
  if (!value) {
    travels.value = travelRepository.getAll();
    return;
  }

  const allTravels = travelRepository.getAll();
  travels.value = allTravels.filter((t) =>
    t.name.toLowerCase().includes(value.toLowerCase()),
  );
});
</script>
