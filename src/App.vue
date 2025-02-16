<template>
  <div id="app" class="min-h-screen bg-gray-50 p-8">
    <branches-reservations />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BranchesReservations from "./components/branchesReservations.vue";

export default defineComponent({
  name: "App",

  components: {
    BranchesReservations,
  },
});
</script>

<style>
@import "./assets/styles/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

dialog {
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px;
  text-align: center;
}
</style>
