<template>
  <base-modal
    @close="$emit('close')"
    @confirm="handleConfirm"
    title="Add Branches"
    :is-confirm-disabled="!selectedBranches.length || isLoading"
    :is-loading="isLoading"
  >
    <div class="bg-gray-50 p-4 h-[300px] overflow-hidden">
      <label class="text-sm font-medium text-left block mb-2"> Branches </label>
      <base-multiple-select
        :value="selectedBranches"
        @input="handleSelectedBranches"
        :options="branchesNotAcceptingReservations"
        placeholder="Select branches"
        :max-height="150"
      />
    </div>
  </base-modal>
</template>

<script>
import BaseModal from "./baseModal.vue";
import { defineComponent } from "vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("branches");
import BaseMultipleSelect from "./baseMultipleSelect.vue";
import { ENABLE_BRANCHES_RESERVATIONS } from "../store/modules/action-types";

export default defineComponent({
  name: "AddBranch",

  components: {
    BaseModal,
    BaseMultipleSelect,
  },

  data() {
    return {
      selectedBranches: [],
      isLoading: false,
    };
  },

  computed: {
    ...mapState(["branches"]),

    branchesNotAcceptingReservations() {
      return this.branches
        .filter((branch) => !branch.accepts_reservations)
        .map((branch) => ({
          value: branch.id,
          label: `${branch.name} (${branch.reference || "No reference"})`,
        }));
    },
  },

  methods: {
    ...mapActions({
      enableBranchesReservations: ENABLE_BRANCHES_RESERVATIONS,
    }),

    handleSelectedBranches(value) {
      this.selectedBranches = value;
    },

    async handleConfirm() {
      this.isLoading = true;
      await this.enableBranchesReservations(
        this.selectedBranches.map((branch) => branch.value)
      );
      this.isLoading = false;
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss" scoped></style>
