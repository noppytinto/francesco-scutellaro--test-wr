<template>
  <teleport to="body">
    <div
      v-if="open"
      class="animate-fade fixed inset-0 z-10 flex items-end justify-center bg-black bg-opacity-50 p-2 sm:items-center sm:p-4"
      @click="handleClickOutside"
    >
      <div
        class="flex min-h-96 w-full flex-col justify-between gap-8 rounded-md bg-white p-5 shadow-lg sm:w-9/12 xl:w-2/5"
        @click.stop
      >
        <header
          class="flex items-center justify-between border-b border-my-neutral-100 pb-3"
        >
          <h2 class="text-xl font-bold">{{ title }}</h2>
          <button @click="handleClose">
            <FontAwesomeIcon
              icon="xmark"
              size="xl"
              class="cursor-pointer text-my-neutral-300 transition-colors hover:text-primary"
            />
          </button>
        </header>

        <slot />

        <footer
          class="flex items-center justify-end gap-6 border-t border-my-neutral-100 pt-4"
        >
          <slot name="actions" />
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

type Props = {
  title: string;
  open: boolean;
  closeOnClickOutside?: boolean;
};

const props = defineProps<Props>();

type Emit = {
  (event: "update:open", value: boolean): void;
};

const emit: Emit = defineEmits();

const handleClose = () => {
  console.log("close");
  emit("update:open", false);
};

const handleClickOutside = (event: MouseEvent) => {
  if (!props.closeOnClickOutside) return;

  if (event.target === event.currentTarget) {
    handleClose();
  }
};
</script>
