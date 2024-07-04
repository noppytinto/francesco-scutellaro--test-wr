<template>
  <UIInput
    type="search"
    placeholder="search"
    icon="magnifying-glass"
    v-model="searchValue"
  />
</template>
<script setup lang="ts">
import UIInput from "~/components/ui/inputs/UIInput.vue";

const searchValue = defineModel<string>("searchValue");
</script>
