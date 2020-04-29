import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    accountId: "5ea843097232351c7076d16f",
    characterId: "5ea843097232351c7076d170"
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