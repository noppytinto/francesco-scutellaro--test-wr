<template>
  <section
    class="flex items-center justify-between gap-4 rounded-md border border-dashed border-primary px-4 py-6"
  >
    <div>
      <h1 class="mb-4 text-lg font-bold text-red-500">
        {{ title }}
      </h1>
      <p>Once you delete a booking, there is no going back.</p>
      <p>Please be certain.</p>
    </div>

    <UIButton
      variant="outlined"
      class="text-red-500"
      @click="$emit('click-delete')"
    >
      {{ buttonText }}
    </UIButton>
  </section>
</template>
<script setup lang="ts">
import UIButton from "~/components/ui/UIButton.vue";

type Props = {
  title: string;
  buttonText: string;
};

type Emits = {
  (event: "click-delete"): void;
};

defineProps<Props>();
defineEmits<Emits>();
</script>
