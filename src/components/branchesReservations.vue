<template>
  <div>
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl text-gray-700 font-normal">Reservations</h1>
        <button
          class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          :disabled="
            areBranchesLoading || branchesAcceptingReservations.length === 0
          "
          :class="{
            'opacity-50 cursor-not-allowed':
              areBranchesLoading || branchesAcceptingReservations.length === 0,
          }"
          @click="handleDisableReservations"
        >
          Disable Reservations
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-sm p-6">
        <div class="flex justify-end mb-4">
          <button
            @click="isAddBranchModalOpen = true"
            :disabled="areBranchesLoading"
            class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50"
            :class="{
              'opacity-50 cursor-not-allowed': areBranchesLoading,
            }"
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
                No branches accepting reservations, please enable reservations
                for the branches you want to accept reservations for.
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>

    <add-branch
      v-if="isAddBranchModalOpen"
      @close="isAddBranchModalOpen = false"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
import {
  GET_BRANCHES,
  DISABLE_RESERVATIONS,
} from "../store/modules/action-types";
const { mapState, mapActions } = createNamespacedHelpers("branches");
import BranchReservationItem from "./branchReservationItem.vue";
import BranchReservationItemSkeleton from "./branchReservationItemSkeleton.vue";
import AddBranch from "./addBranch.vue";

export default defineComponent({
  name: "BranchesReservations",

  components: {
    BranchReservationItem,
    BranchReservationItemSkeleton,
    AddBranch,
  },

  data() {
    return {
      isAddBranchModalOpen: false,
    };
  },

  created() {
    this.getBranches();
  },

  computed: {
    ...mapState(["branches", "areBranchesLoading"]),

    branchesAcceptingReservations() {
      return this.branches.filter((branch) => branch.accepts_reservations);
    },
  },

  methods: {
    ...mapActions({
      getBranches: GET_BRANCHES,
      disableReservations: DISABLE_RESERVATIONS,
    }),

    handleDisableReservations() {
      this.disableReservations();
    },
  },
});
</script>

<style lang="scss" scoped></style>
