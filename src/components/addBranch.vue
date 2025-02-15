<template>
  <base-modal @close="$emit('close')" :is-open="isOpen" title="Add Branches">
    <div>
      <h1>Add Branch</h1>
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "./baseModal.vue";

export default {
  components: {
    BaseModal,
  },

  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
