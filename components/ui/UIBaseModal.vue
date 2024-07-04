<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-10 flex animate-fade items-end justify-center bg-black p-2 backdrop-blur-sm sm:items-center sm:p-4"
      @click="handleClickOutside"
      :class="{
        // make the background darker if the modal is small
        'bg-opacity-50': !small,
        'bg-opacity-75': small,
      }"
    >
      <!-- actual modal -->
      <div
        class="flex max-h-[80%] w-full flex-col justify-between gap-8 overflow-x-auto rounded-lg bg-white shadow-lg"
        @click.stop
        :class="[
          {
            'sm:w-9/12 xl:w-2/3 2xl:w-5/12': !small,
            'sm:w-1/5': small,
          },
          $attrs.class,
        ]"
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
  small?: boolean;
};

type Emits = {
  (event: "update:open", value: boolean): void;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClose = () => {
  emit("update:open", false);
};

const handleClickOutside = (event: MouseEvent) => {
  if (!props.closeOnClickOutside) return;

  if (event.target === event.currentTarget) {
    handleClose();
  }
};
</script>
