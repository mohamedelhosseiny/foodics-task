<template>
  <div
    class="flex items-center gap-2 border border-gray-200 p-2 rounded-lg bg-white h-[56px]"
  >
    <div class="flex gap-2 flex-wrap">
      <template v-if="workingHours.length">
        <span
          v-for="(value, index) in workingHours"
          :key="index"
          class="inline-flex items-center gap-1 px-3 py-1 border border-purple-600 rounded-lg text-sm"
        >
          <div class="flex gap-1">
            <slot-input
              :initial-value="value"
              @update="handleUpdate($event, index)"
              @remove="handleRemoveSlot(index)"
            />
          </div>
        </span>
      </template>
      <template v-else>
        <label class="text-sm font-medium text-gray-500">
          Add Available Reservation Times
        </label>
      </template>
    </div>
    <button
      @click="handleAddSlot"
      class="px-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg border ml-auto"
      :class="{ 'opacity-50 cursor-not-allowed': workingHours.length >= 3 }"
      :disabled="workingHours.length >= 3"
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

  methods: {
    handleUpdate(value, index) {
      this.$emit("update", { updatedSlot: value, updatedSlotIndex: index });
    },

    handleAddSlot() {
      if (this.workingHours.length < 3) {
        this.$emit("add-slot");
      }
    },

    handleRemoveSlot(index) {
      this.$emit("remove-slot", index);
    },
  },
};
</script>
