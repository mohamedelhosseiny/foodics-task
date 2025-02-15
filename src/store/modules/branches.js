import { GET_BRANCHES, SET_BRANCHES_LOADING } from "./action-types";
import { SET_BRANCHES } from "./mutation-types";
import api from "@/services/api";

const actions = {
  [GET_BRANCHES]({ commit }) {
    commit(SET_BRANCHES_LOADING, true);

    api("branches?include[0]=sections&include[1]=sections.tables")
      .then((data) => {
        commit(SET_BRANCHES, data.data);
      })
      .finally(() => {
        commit(SET_BRANCHES_LOADING, false);
      });
  },
};

const mutations = {
  [SET_BRANCHES](state, branches) {
    state.branches = branches;
  },

  [SET_BRANCHES_LOADING](state, loading) {
    state.areBranchesLoading = loading;
  },
};

const state = {
  branches: [],
  areBranchesLoading: false,
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
