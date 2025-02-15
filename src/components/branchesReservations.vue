<template>
  <div>
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl text-gray-700 font-normal">Reservations</h1>
        <button
          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Disable Reservations
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-end mb-4">
          <button
            class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Add Branches
          </button>
        </div>

        <div class="w-full">
          <div class="flex border-b">
            <div class="flex-1 text-left py-4 font-medium">Branch</div>
            <div class="flex-1 text-left py-4 font-medium">Reference</div>
            <div class="flex-1 text-left py-4 font-medium">
              Number of Tables
            </div>
            <div class="flex-1 text-left py-4 font-medium">
              Reservation Duration
            </div>
          </div>

          <branch-reservation-item
            v-for="branch in branchesAcceptingReservations"
            :key="branch.id"
            :branch="branch"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import { GET_BRANCHES } from "../store/modules/action-types";
const { mapState, mapActions } = createNamespacedHelpers("branches");
import BranchReservationItem from "./branchReservationItem.vue";

export default defineComponent({
  name: "BranchesReservations",
  components: {
    BranchReservationItem,
  },

  created() {
    this.getBranches();
  },

  computed: {
    ...mapState(["branches"]),

    branchesAcceptingReservations() {
      return this.branches.filter((branch) => branch.accepts_reservations);
    },
  },

  methods: {
    ...mapActions({
      getBranches: GET_BRANCHES,
    }),
  },
});
</script>

<style lang="scss" scoped></style>
