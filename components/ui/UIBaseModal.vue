<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-10 flex animate-fade items-end justify-center bg-black bg-opacity-50 p-2 sm:items-center sm:p-4"
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
          <UIButton
            variant="iconOnly"
            icon="xmark"
            icon-size="xl"
            @click="handleClose"
          />
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
