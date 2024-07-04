<template>
  <UIBaseModal title="Create new booking" v-model:open="open">
    <template #default>
      <UITabbedView :tabs="tabs" v-model:current-active-tab="currentActiveTab">
        <template #default="{ activeTab }">
          <div v-if="activeTab === 0">tab 1</div>
          <div v-if="activeTab === 1">tab 2</div>
          <div v-if="activeTab === 2">tab 3</div>
        </template>
      </UITabbedView>
    </template>

    <template #actions>
      <!--      next and previous buttons-->
      <UIButton :disabled="currentActiveTab <= 0" @click="handleClickPrevious">
        Previous
      </UIButton>
      <UIButton
        :disabled="currentActiveTab >= tabs.length - 1"
        @click="handleClickNext"
      >
        Next
      </UIButton>
      <UIButton
        :disabled="currentActiveTab !== tabs.length - 1"
        form="booking-form"
        type="submit"
        >Save</UIButton
      >
    </template>
  </UIBaseModal>
</template>
<script setup lang="ts">
import type { Tab } from "~/components/tabs/types";
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UITabbedView from "~/components/tabs/UITabbedView.vue";

const defaultTab = 0;
const currentActiveTab = ref(defaultTab);

const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});

const tabs = ref<Tab[]>([
  { title: "Select travel", id: 0 },
  { title: "Fill customer data", id: 1 },
  { title: "Select payment method", id: 2 },
]);

const handleClickPrevious = () => {
  if (currentActiveTab.value > 0) {
    currentActiveTab.value--;
  }
};

const handleClickNext = () => {
  if (currentActiveTab.value < tabs.value.length - 1) {
    currentActiveTab.value++;
  }
};
</script>
