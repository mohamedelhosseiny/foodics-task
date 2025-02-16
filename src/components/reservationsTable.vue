<template>
  <div class="w-full">
    <div class="flex border-b">
      <div class="flex-1 text-left py-4 font-medium">Branch</div>
      <div class="flex-1 text-left py-4 font-medium">Reference</div>
      <div class="flex-1 text-left py-4 font-medium">Number of Tables</div>
      <div class="flex-1 text-left py-4 font-medium">Reservation Duration</div>
    </div>

    <template v-if="areBranchesLoading">
      <branch-reservation-item-skeleton v-for="i in 8" :key="i" />
    </template>
    <template v-else>
      <template v-if="branchesAcceptingReservations.length > 0">
        <branch-reservation-item
          v-for="branch in branchesAcceptingReservations"
          :key="branch.id"
          :branch="branch"
        />
      </template>
      <template v-else>
        <div
          class="text-center text-gray-500 py-4 min-h-[300px] flex items-center justify-center"
        >
          No branches accepting reservations, please enable reservations for the
          branches you want to accept reservations for.
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { defineComponent } from "vue";
const { mapState, mapGetters } = createNamespacedHelpers("branches");
import BranchReservationItem from "./branchReservationItem.vue";
import BranchReservationItemSkeleton from "./branchReservationItemSkeleton.vue";

export default defineComponent({
  name: "ReservationsTable",

  components: {
    BranchReservationItem,
    BranchReservationItemSkeleton,
  },

  computed: {
    ...mapState(["areBranchesLoading"]),

    ...mapGetters(["branchesAcceptingReservations"]),
  },
});
</script>
