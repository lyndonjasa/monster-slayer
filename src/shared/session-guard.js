import Vue from "vue";
import { store } from "../store";

export const isAuthorized = (to, from, next) => {
  // route level check
  if (!store.getters.account) {
    loginBySession(); // login using session values
    // check if creds are restored by session
    if (!store.getters.account) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
}

const loginBySession = () => {
  const hasSession = Vue.prototype.$session.exists();
  if (hasSession) {
    store.commit("sessionLogin");
  }
};