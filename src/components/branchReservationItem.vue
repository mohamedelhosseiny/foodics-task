<template>
  <div class="flex border-b hover:bg-gray-50 cursor-pointer">
    <div class="w-1/4 py-4">{{ branch.name }}</div>
    <div class="w-1/4 py-4">{{ branch.reference }}</div>
    <div class="w-1/4 py-4">{{ tablesAcceptingReservations }}</div>
    <div class="w-1/4 py-4">{{ branch.reservation_duration }} Minutes</div>
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
    tablesAcceptingReservations() {
      return this.branch.sections.reduce((acc, section) => {
        return (
          acc +
          section.tables.filter((table) => table.accepts_reservations).length
        );
      }, 0);
    },
  },
};
</script>
