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
      <UIButton icon="plus" @click="handleClickAddTravel">
        Add Travel
      </UIButton>
    </UITableActions>

    <TravelsTable :travels @row-click="handleClickRow" />

    <CreateTravelModal
      v-model:open="isCreateModalOpen"
      @submit="handleClickSubmit"
    />
    <EditTravelModal
      v-model:open="isEditModalOpen"
      :travel="clickedTravel!"
      @submit="handleClickSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { type Travel } from "~/entities/travel/types";
import UIButton from "~/components/ui/UIButton.vue";
import UITableActions from "~/components/ui/table/UITableActions.vue";
import UIInput from "~/components/ui/inputs/UIInput.vue";
import { TravelRepository } from "~/respositories/TravelRepository";
import TravelsTable from "~/components/travel/TravelsTable.vue";
import CreateTravelModal from "~/components/travel/CreateTravelModal.vue";
import EditTravelModal from "~/components/travel/EditTravelModal.vue";

definePageMeta({
  title: "Travels",
  description: "This is the travels page",
});

// ====================================================
// STATE & DATA
// ====================================================
const travelRepository = new TravelRepository();
const travels = ref<Travel[]>([]);
const searchValue = ref("");
const clickedTravel = ref<Travel | undefined>(undefined);
const isEditModalOpen = ref(false);
const isCreateModalOpen = ref(false);

// ====================================================
// LIFECYCLE
// ====================================================
onMounted(() => {
  travels.value = travelRepository.getAll();
});

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

// ====================================================
// FUNCTIONS
// ====================================================
function handleClickRow(travel: Travel) {
  console.log(
    "fffffffffffffffffffffffffffffffffffffffffff clickedTravel:",
    travel,
  );
  isEditModalOpen.value = true;
  clickedTravel.value = toRaw(travel);
}

function handleClickAddTravel() {
  clickedTravel.value = undefined;
  isCreateModalOpen.value = true;
}

function handleClickSubmit() {
  // refresh the table
  travels.value = travelRepository.getAll();
}
</script>
