<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-10 flex animate-fade items-end justify-center bg-black bg-opacity-50 p-2 backdrop-blur-sm sm:items-center sm:p-4"
      @click="handleClickOutside"
    >
      <!-- actual modal -->
      <div
        class="flex max-h-[80%] w-full flex-col justify-between gap-8 overflow-x-auto rounded-md bg-white shadow-lg sm:w-9/12 xl:w-2/5"
        @click.stop
      >
        <header
          class="sticky top-0 z-10 flex items-center justify-between border-b border-my-neutral-100 bg-white p-5"
        >
          <h2 class="text-xl font-bold">
            <slot name="title">{{ props.title }}</slot>
          </h2>
          <UIButton
            variant="iconOnly"
            icon="xmark"
            icon-size="xl"
            s
            @click="handleClose"
          />
        </header>

        <div class="p-5">
          <slot />
        </div>

        <footer
          class="sticky bottom-0 flex items-center justify-end gap-6 border-t border-my-neutral-100 bg-white p-5"
        >
          <slot name="actions" />
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
type Props = {
  title?: string;
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
