import {
  GET_BRANCHES,
  SET_BRANCHES_LOADING,
  ENABLE_BRANCH_RESERVATIONS,
  DISABLE_RESERVATIONS,
  UPDATE_BRANCH_SETTINGS,
} from "./action-types";
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

  [ENABLE_BRANCH_RESERVATIONS]({ commit }, branchId) {
    return api(`branches/${branchId}`, {
      method: "PUT",
      body: {
        accepts_reservations: true,
      },
    }).then(() => {
      commit(ENABLE_BRANCH_RESERVATIONS, branchId);
    });
  },

  [DISABLE_RESERVATIONS]({ commit }) {
    const branchesAcceptingReservations = state.branches.filter(
      (branch) => branch.accepts_reservations
    );

    commit(SET_BRANCHES_LOADING, true);

    Promise.all(
      branchesAcceptingReservations.map((branch) =>
        api(`branches/${branch.id}`, {
          method: "PUT",
          body: { accepts_reservations: false },
        })
      )
    )
      .then(() => {
        commit(DISABLE_RESERVATIONS);
      })
      .finally(() => {
        commit(SET_BRANCHES_LOADING, false);
      });
  },

  [UPDATE_BRANCH_SETTINGS](
    { commit },
    { branchId, reservationDuration, reservationTimes }
  ) {
    return api(`branches/${branchId}`, {
      method: "PUT",
      body: {
        reservation_duration: reservationDuration,
        reservation_times: reservationTimes,
      },
    }).then(() => {
      commit(UPDATE_BRANCH_SETTINGS, {
        branchId,
        reservationDuration,
        reservationTimes,
      });
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

  [ENABLE_BRANCH_RESERVATIONS](state, branchId) {
    state.branches = state.branches.map((branch) =>
      branch.id === branchId
        ? { ...branch, accepts_reservations: true }
        : branch
    );
  },

  [DISABLE_RESERVATIONS](state) {
    state.branches = state.branches.map((branch) =>
      branch.accepts_reservations
        ? { ...branch, accepts_reservations: false }
        : branch
    );
  },

  [UPDATE_BRANCH_SETTINGS](
    state,
    { branchId, reservationDuration, reservationTimes }
  ) {
    state.branches = state.branches.map((branch) =>
      branch.id === branchId
        ? {
            ...branch,
            reservation_duration: reservationDuration,
            reservation_times: reservationTimes,
          }
        : branch
    );
  },
};

const getters = {
  branchesAcceptingReservations: (state) =>
    state.branches.filter((branch) => branch.accepts_reservations),
};

const state = {
  branches: [],
  areBranchesLoading: false,
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
