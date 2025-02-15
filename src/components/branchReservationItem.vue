<template>
  <div class="flex border-b hover:bg-gray-50 cursor-pointer">
    <div class="flex-1 py-4">{{ branch.name }}</div>
    <div class="flex-1 py-4">{{ branch.reference }}</div>
    <div class="flex-1 py-4">{{ tablesCount }}</div>
    <div class="flex-1 py-4">{{ branch.reservation_duration }} Minutes</div>
  </div>
</template>

<script>
export default {
  props: {
    branch: {
      type: Object,
      required: true,
    },
  },

  computed: {
    tablesCount() {
      return this.branch.sections.reduce(
        (acc, section) => acc + section.tables.length,
        0
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
