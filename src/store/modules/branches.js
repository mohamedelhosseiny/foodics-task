import { GET_BRANCHES } from "./action-types";
import { SET_BRANCHES } from "./mutation-types";
import api from "@/services/api";

const actions = {
  [GET_BRANCHES]({ commit }) {
    api("branches?include[0]=sections&include[1]=sections.tables").then(
      (data) => {
        commit(SET_BRANCHES, data.data);
      }
    );
  },
};

const mutations = {
  [SET_BRANCHES](state, branches) {
    state.branches = branches;
  },
};

const state = {
  branches: [],
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
