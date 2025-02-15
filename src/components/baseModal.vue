<template>
  <dialog
    @click.self="close"
    class="w-[500px] bg-white rounded-lg shadow-lg p-0"
  >
    <div class="px-6 py-4 border-b">
      <h2 class="text-xl font-bold text-left">{{ title }}</h2>
    </div>

    <div class="px-6 py-6">
      <slot />
    </div>

    <div class="px-6 py-4 border-t flex justify-end items-center gap-3">
      <slot name="actions-left" />
      <div class="flex gap-3">
        <button
          @click="close"
          class="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          Close
        </button>
        <button
          class="px-6 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
        >
          Save
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.$el.showModal();
      }
    },
  },

  methods: {
    close() {
      this.$el.close();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
