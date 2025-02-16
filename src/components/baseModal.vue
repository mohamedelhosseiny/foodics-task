<template>
  <dialog
    @click.self="close"
    class="w-[500px] bg-white rounded-lg shadow-lg p-0"
  >
    <div class="px-6 py-4 border-b">
      <h2 class="text-xl font-bold text-left">{{ title }}</h2>
    </div>

    <div>
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
          :disabled="isConfirmDisabled"
          @click="confirm"
        >
          <div v-if="isLoading" class="flex items-center gap-2">
            <div
              class="w-4 h-4 border-2 border-white rounded-full animate-spin"
            ></div>
          </div>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isConfirmDisabled: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.$el.showModal();
  },

  methods: {
    close() {
      this.$el.close();
      this.$emit("close");
    },

    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style lang="scss" scoped>
dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
