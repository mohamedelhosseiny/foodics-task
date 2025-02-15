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

          <div
            v-for="i in 3"
            :key="i"
            class="flex border-b hover:bg-gray-50 cursor-pointer"
          >
            <div class="flex-1 py-4">Branch 1</div>
            <div class="flex-1 py-4">B01</div>
            <div class="flex-1 py-4">0</div>
            <div class="flex-1 py-4">30 Minutes</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
