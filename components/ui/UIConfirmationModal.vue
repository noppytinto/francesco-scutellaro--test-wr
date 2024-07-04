<template>
  <UIBaseModal v-model:open="open" small>
    <template #title>
      <h1 class="text-xl font-bold">
        {{ title }}
      </h1>
    </template>
    <template #default>
      <p>
        {{ message }}
      </p>
    </template>
    <template #actions>
      <UIButton variant="text" @click="open = false"> No </UIButton>
      <UIButton
        variant="outlined"
        @click="
          open = false;
          $emit('click-yes');
        "
      >
        Yes
      </UIButton>
    </template>
  </UIBaseModal>
</template>
<script setup lang="ts">
import UIBaseModal from "~/components/ui/UIBaseModal.vue";
import UIButton from "~/components/ui/UIButton.vue";

type Props = {
  title: string;
  message: string;
};

type Emits = {
  (event: "click-yes"): void;
};

defineProps<Props>();
defineEmits<Emits>();

const open = defineModel<boolean>("open", {
  default: false,
});
</script>
