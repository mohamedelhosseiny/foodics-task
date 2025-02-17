<template>
  <div
    class="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white"
  >
    <div class="flex gap-2 flex-wrap">
      <span
        v-for="(value, key) in workingHours"
        :key="key"
        class="inline-flex items-center gap-1 px-3 py-1 border border-purple-600 rounded-lg text-sm"
      >
        <div class="flex gap-1">
          <slot-input :initial-value="value" />
        </div>
      </span>
    </div>
    <button
      class="px-1 text-gray-400 hover:text-gray-600 rounded-lg border ml-auto"
    >
      +
    </button>
  </div>
</template>

<script>
import SlotInput from "./slotInput.vue";

export default {
  components: {
    SlotInput,
  },

  props: {
    workingHours: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
};
</script>

<style scoped>
input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
}

/* Ensure only HH:MM is displayed */
input[type="time"] {
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
}

/* Override styles for some browsers */
input[type="time"]::-webkit-datetime-edit-ampm-field {
  display: none;
}
</style>
