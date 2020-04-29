import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accountId: "5ea8f058e928dc5ad8d2fb4f",
    characterId: "5ea8f058e928dc5ad8d2fb50"
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