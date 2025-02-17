<template>
  <base-modal
    @close="$emit('close')"
    @confirm="handleConfirm"
    title="Add Branches"
    :is-confirm-disabled="!selectedBranch || isLoading"
    :is-loading="isLoading"
  >
    <div class="bg-gray-50 p-4 h-[300px] overflow-hidden">
      <label class="text-sm font-medium text-left block mb-2"> Branches </label>
      <base-single-select
        :value="selectedBranch"
        @input="handleSelectedBranch"
        :options="branchesNotAcceptingReservations"
        placeholder="Select a branch..."
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
import BaseSingleSelect from "./baseSingleSelect.vue";
import { ENABLE_BRANCH_RESERVATIONS } from "../store/modules/action-types";

export default defineComponent({
  name: "AddBranch",

  components: {
    BaseModal,
    BaseMultipleSelect,
    BaseSingleSelect,
  },

  data() {
    return {
      selectedBranch: null,
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
      enableBranchReservations: ENABLE_BRANCH_RESERVATIONS,
    }),

    handleSelectedBranch(value) {
      this.selectedBranch = value;
    },

    async handleConfirm() {
      this.isLoading = true;
      await this.enableBranchReservations(this.selectedBranch);
      this.isLoading = false;
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss" scoped></style>
