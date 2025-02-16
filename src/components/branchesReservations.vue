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

        <reservations-table />
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
const { mapState, mapActions, mapGetters } =
  createNamespacedHelpers("branches");
import ReservationsTable from "./reservationsTable.vue";
import AddBranch from "./addBranch.vue";

export default defineComponent({
  name: "BranchesReservations",

  components: {
    AddBranch,
    ReservationsTable,
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
    ...mapState(["areBranchesLoading"]),

    ...mapGetters(["branchesAcceptingReservations"]),
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
