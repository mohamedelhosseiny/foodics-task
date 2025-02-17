<template>
  <div class="relative w-full">
    <div
      @click="toggleDropdown"
      class="w-full min-h-[54px] px-3 py-2 border rounded-lg cursor-pointer flex flex-wrap gap-2 items-center bg-white"
      :class="{ 'border-blue-400 ring-2 ring-blue-100': isOpen }"
    >
      <div v-if="selectedItems.length > 0" class="flex gap-2">
        <span
          v-for="item in selectedItems.slice(0, 2)"
          :key="item.value"
          class="items-center gap-1 px-3 py-1 border border-purple-600 rounded-lg text-sm text-black max-w-[170px] truncate flex"
        >
          <span class="max-w-[140px] truncate block">{{ item.label }}</span>
          <button
            @click.stop="removeItem(item)"
            class="hover:text-blue-800 p-1"
          >
            ×
          </button>
        </span>
        <span
          v-if="selectedItems.length > 2"
          class="rounded-full bg-white px-2 py-1 text-black border border-purple-600 text-sm inline-flex items-center"
        >
          +{{ selectedItems.length - 2 }}
        </span>
      </div>

      <span v-if="selectedItems.length === 0" class="text-gray-500">
        {{ placeholder }}
      </span>

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
        v-for="item in availableItems"
        :key="item.value"
        @click="toggleItem(item)"
        class="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
      >
        <input
          type="checkbox"
          :checked="isSelected(item)"
          class="rounded text-blue-600"
          @click.stop
        />
        {{ item.label }}
      </div>
      <div
        class="px-3 py-2 min-h-[100px] flex items-center justify-center"
        v-if="availableItems.length === 0"
      >
        <span class="text-gray-500">No items found</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseMultipleSelect",

  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "Select items...",
    },
    maxHeight: {
      type: Number,
      default: 200,
    },
    value: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
      selectedItems: [],
    };
  },

  computed: {
    availableItems() {
      return this.options;
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.selectedItems = newVal;
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

    toggleItem(item) {
      const index = this.selectedItems.findIndex((i) => i.value === item.value);
      if (index === -1) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems.splice(index, 1);
      }
      this.$emit("input", this.selectedItems);
    },

    removeItem(item) {
      const index = this.selectedItems.findIndex((i) => i.value === item.value);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
        this.$emit("input", this.selectedItems);
      }
    },

    isSelected(item) {
      return this.selectedItems.some((i) => i.value === item.value);
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>
