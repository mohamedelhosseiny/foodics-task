import { GET_BRANCHES } from "./action-types";
import { SET_BRANCHES } from "./mutation-types";

const actions = {
  [GET_BRANCHES]({ commit }) {
    commit(SET_BRANCHES, branches);
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
};
