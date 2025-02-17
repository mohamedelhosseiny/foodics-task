<template>
  <div>
    <vue-timepicker
      format="HH:mm"
      placeholder="00:00"
      manual-input
      hide-dropdown
      hide-clear-button
      input-width="50px"
      v-model="fromTime"
    />
    <span>:</span>
    <vue-timepicker
      format="HH:mm"
      placeholder="00:00"
      manual-input
      hide-dropdown
      hide-clear-button
      input-width="50px"
      v-model="toTime"
    />
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
      fromTime: this.initialValue[0],
      toTime: this.initialValue[1],
    };
  },

  methods: {
    handleInput(event, field) {
      console.log(event.target.value);

      this[field] = event.target.value.replace(/[^0-9]/g, "");

      if (this[field] < 10) {
        this[field] = `0${this[field]}`;
      }

      if (this[field] > 23) {
        this[field] = `23`;
      }
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
    }

    .controls {
      display: none;
    }
  }
}
</style>
