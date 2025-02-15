import Vue from "vue";
import Vuex from "vuex";
import branches from "./modules/branches";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    branches: branches,
  },
});

export default store;
