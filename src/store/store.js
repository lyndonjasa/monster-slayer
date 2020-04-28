import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accountId: "5ea57c36ed4a3144b0631b9b",
    characterId: ""
  },
  getters: {
    account: (state) => {
      return state.accountId;
    },
    character: (state) => {
      return state.characterId
    }
  },
  mutations: {
    setAccount: (state, id) => {
      state.accountId = id;
    },
    setCharacter: (state, id) => {
      state.characterId = id;
    }
  }
});