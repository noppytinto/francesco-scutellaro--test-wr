<template>
  <div class="relative">
    <div
      class="flex items-center justify-between rounded-md bg-my-neutral-50 focus-within:ring-1 focus-within:ring-tertiary"
    >
      <input
        v-model="search"
        @input="handleInput"
        @keydown="handleKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.enter="handleEnter"
        @keydown.esc="handleEsc"
        class="text-my-neutral-900 w-full border-none bg-transparent px-3 py-2 focus:outline-none"
        type="search"
        placeholder="Search..."
        :required
      />
      <slot name="append" />
    </div>
    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 max-h-60 w-full overflow-x-auto rounded-md border border-gray-300 bg-white shadow-lg"
    >
      <li
        v-for="(item, index) in filteredItems"
        :key="index"
        @click="handleItemClick(item)"
        @mouseenter="handleMouseEnter(index)"
        :class="{ 'bg-gray-200': index === highlightedIndex }"
        class="cursor-pointer p-2"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type Props = {
  itemTitles: string[];
  itemIds: string[];
  required?: boolean;
};

const props = defineProps<Props>();

const selectedItemId = defineModel<string>("modelValue", {
  default: undefined,
});

const search = ref("");

const isOpen = ref(false);
const highlightedIndex = ref(-1);

const filteredItems = computed(() => {
  const searchValue = search.value.toLowerCase();
  return props.itemTitles.filter((item) =>
    item.toLowerCase().includes(searchValue),
  );
});

// ====================================================
// WATCHERS
// ====================================================
watchEffect(() => {
  if (selectedItemId.value) {
    const index = props.itemIds.indexOf(selectedItemId.value);
    search.value = props.itemTitles[index];
  }
});

// ====================================================
// FUNCTIONS
// ====================================================
function handleInput() {
  isOpen.value = true;
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === "Enter") {
    handleEnter();
  } else if (event.key === "Escape") {
    handleEsc();
  }
}

function handleEnter() {
  if (highlightedIndex.value !== -1) {
    handleItemClick(filteredItems.value[highlightedIndex.value]);
  }
}

function handleEsc() {
  isOpen.value = false;
}

function handleItemClick(item: string) {
  search.value = item;
  isOpen.value = false;

  const index = props.itemTitles.indexOf(item);
  selectedItemId.value = props.itemIds[index];

  highlightedIndex.value = -1;
}

function handleFocus() {
  isOpen.value = true;
}

function handleBlur() {
  setTimeout(() => {
    isOpen.value = false;
  }, 200);
}

function handleMouseEnter(index: number) {
  highlightedIndex.value = index;
}
</script>
