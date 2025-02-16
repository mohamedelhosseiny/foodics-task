<template>
  <div class="relative w-full">
    <div
      @click="toggleDropdown"
      class="w-full h-[54px] px-3 py-2 border rounded-lg cursor-pointer flex items-center content-start bg-white"
      :class="{ 'border-blue-400 ring-2 ring-blue-100': isOpen }"
    >
      <span
        v-if="selected"
        class="text-left flex items-center gap-1 px-3 py-1 border border-blue-400 rounded-lg text-sm"
      >
        {{ selected.label }}
      </span>
      <div v-else class="text-gray-500 text-left">
        {{ placeholder }}
      </div>

      <span class="ml-auto">
        <svg
          class="w-4 h-4 text-gray-500 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" />
        </svg>
      </span>
    </div>

    <div
      v-show="isOpen"
      class="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg overflow-auto"
      :style="{ maxHeight: `${maxHeight}px` }"
    >
      <div
        v-for="item in options"
        :key="item.value"
        @click="selectItem(item)"
        class="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
        :class="{ 'bg-blue-50': isSelected(item) }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSingleSelect",

  props: {
    value: {
      type: [String, Number, Object],
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select an item...",
    },
    maxHeight: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      isOpen: false,
      selected: null,
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.selected = this.options.find((item) => item.value === newVal);
      },
    },
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },

    selectItem(item) {
      this.selected = item;
      this.$emit("input", item.value);
      this.isOpen = false;
    },

    isSelected(item) {
      return this.selected && this.selected.value === item.value;
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>
