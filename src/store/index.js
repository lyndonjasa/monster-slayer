import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    // accountId: "5ea98aebda11384fb4cbbd22",
    // characterId: "5ea98aebda11384fb4cbbd23"
    accountId: "",
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
    },
    sessionLogin: (state) => {
      const accountId = Vue.prototype.$session.get("account");
      const characterId = Vue.prototype.$session.get("character");

      state.accountId = accountId;
      state.characterId = characterId;
    },
    sessionLogout: (state) => {
      Vue.prototype.$session.clear();
      Vue.prototype.$session.destroy();
    }
  }
});