<template>
  <table class="w-full table-auto">
    <thead class="border-b border-my-neutral-100">
      <tr>
        <th
          v-for="header in headers"
          :key="header"
          class="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
        >
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="value in data"
        :key="value.id"
        class="border-b border-my-neutral-100 transition-colors hover:bg-my-neutral-50"
        :class="rowClass"
        @click="$emit('row-click', value)"
      >
        <slot :value="value" />
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts" generic="T extends WithId">
type Props = {
  headers: string[];
  data: T[];
  rowClass?: string;
};

defineProps<Props>();

type Emit = {
  (event: "row-click", value: T): void;
};

defineEmits<Emit>();
</script>
