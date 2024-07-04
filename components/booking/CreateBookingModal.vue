<template>
  <UIBaseModal title="Create new booking" v-model:open="open">
    <UITabbedView :tabs="tabs" :active-tab="0">
      <template #default="{ activeTab }">
        <div v-if="activeTab === 0">tab 1</div>
        <div v-if="activeTab === 1">tab 2</div>
        <div v-if="activeTab === 2">tab 3</div>
      </template>
    </UITabbedView>
    test
  </UIBaseModal>
</template>
<script setup lang="ts">
import type { Tab } from "~/components/tabs/types";
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UITabbedView from "~/components/tabs/UITabbedView.vue";

const open = defineModel<boolean>("open", {
  default: false,
  required: true,
});

const tabs = ref<Tab[]>([
  { title: "Step 1", id: 0 },
  { title: "Step 2", id: 1 },
  { title: "Step 3", id: 2 },
]);
</script>
