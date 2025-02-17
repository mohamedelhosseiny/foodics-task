<template>
  <div class="relative group">
    <vue-timepicker
      format="HH:mm"
      placeholder="00:00"
      manual-input
      hide-dropdown
      hide-clear-button
      input-width="50px"
      v-model="fromTime"
    />
    <span>-</span>
    <vue-timepicker
      format="HH:mm"
      placeholder="00:00"
      manual-input
      hide-dropdown
      hide-clear-button
      input-width="50px"
      v-model="toTime"
    />
    <button
      @click="$emit('remove')"
      class="absolute -right-[14px] -top-4 items-center justify-center w-5 h-5 bg-white border rounded-full text-gray-400 hover:text-gray-600"
    >
      ×
    </button>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  components: {
    VueTimepicker,
  },

  props: {
    initialValue: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      fromTime: [],
      toTime: [],
    };
  },

  computed: {
    slotValue() {
      return [this.fromTime, this.toTime];
    },
  },

  watch: {
    slotValue(value) {
      this.$emit("update", value);
    },

    initialValue: {
      handler(value) {
        this.fromTime = value[0];
        this.toTime = value[1];
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .time-picker {
    input {
      border: none;
      outline: none;
      height: auto;
    }

    .controls {
      display: none;
    }
  }
}
</style>
