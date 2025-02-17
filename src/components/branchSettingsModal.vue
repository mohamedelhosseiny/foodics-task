<template>
  <base-modal
    :title="`Edit ${branch.name} branch reservation settings`"
    @close="$emit('close')"
    @confirm="handleSave"
    :is-loading="isSaving"
  >
    <div class="px-6 py-6 space-y-6 bg-gray-50">
      <div
        class="bg-blue-50 p-4 text-blue-700 border-y border-blue-200 text-left"
      >
        Branch working hours are {{ workingHours }}
      </div>

      <div class="space-y-2">
        <label class="block text-gray-700 text-left">
          Reservation Duration (minutes) <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.duration"
          type="number"
          placeholder="30 minutes"
          :class="{
            'border-red-500': !form.duration,
          }"
          min="0"
          class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-gray-700 text-left">Tables</label>
        <base-multiple-select
          v-model="form.tables"
          :options="availableTables"
          placeholder="Select tables..."
        />
      </div>

      <div v-for="day in workingDays" :key="day" class="space-y-2">
        <div class="flex items-center justify-between">
          <label class="block text-gray-700 capitalize">{{ day }}</label>
          <button
            v-if="day === 'saturday'"
            class="text-purple-600 text-sm hover:text-purple-700"
            @click="handleApplyOnAllDays"
          >
            Apply on all days
          </button>
        </div>
        <settings-slot
          :working-hours="form.workingHours[day]"
          @update="handleUpdateWorkingHours($event, day)"
          @add-slot="handleAddSlot(day)"
          @remove-slot="handleRemoveSlot($event, day)"
        />
      </div>
    </div>
    <template #actions-left>
      <button class="text-red-500 hover:text-red-600">
        Disable Reservations
      </button>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/baseModal.vue";
import BaseMultipleSelect from "@/components/baseMultipleSelect.vue";
import SettingsSlot from "@/components/settingsSlot.vue";

export default {
  name: "BranchSettingsModal",

  components: {
    BaseModal,
    BaseMultipleSelect,
    SettingsSlot,
  },

  props: {
    branch: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      isSaving: false,
      form: {
        duration: 30,
        tables: [],
        workingHours: {
          saturday: [],
          sunday: [],
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
        },
      },

      workingDays: [
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
      ],
    };
  },

  created() {
    this.form.duration = this.branch.reservation_duration;
    this.workingDays.forEach((day) => {
      this.form.workingHours[day] = this.sortSlots(
        this.branch.reservation_times[day]
      );
    });
  },

  computed: {
    availableTables() {
      const tables = [];

      this.branch.sections.forEach((section) => {
        section.tables.forEach((table) => {
          tables.push({
            value: table.id,
            label: `${section.name} - ${table.name}`,
          });
        });
      });

      return tables;
    },

    workingHours() {
      return `${this.branch.opening_from} - ${this.branch.opening_to}`;
    },
  },

  methods: {
    async handleSave() {
      this.isSaving = true;
      try {
        this.$emit("close");
      } finally {
        this.isSaving = false;
      }
    },

    sortSlots(day) {
      return day.sort((a, b) => a[0].localeCompare(b[0]));
    },

    handleUpdateWorkingHours({ updatedSlot, updatedSlotIndex }, day) {
      this.form.workingHours[day] = this.form.workingHours[day].map(
        (existingSlot, existingSlotIndex) =>
          existingSlotIndex === updatedSlotIndex ? updatedSlot : existingSlot
      );
    },

    handleAddSlot(day) {
      this.form.workingHours[day].push(["00:00", "00:00"]);
    },

    handleRemoveSlot(index, day) {
      this.form.workingHours[day] = this.form.workingHours[day].filter(
        (slot, slotIndex) => slotIndex !== index
      );
    },

    handleApplyOnAllDays() {
      this.workingDays.forEach((day) => {
        this.form.workingHours[day] = [...this.form.workingHours["saturday"]];
      });
    },
  },
};
</script>
