import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";
import "./components/global/global-component";
import VueRouter from "vue-router";
import router from "./views/routes";
import { store } from "./store/store";

library.add(fas);
Vue.component('v-icon', FontAwesomeIcon);

Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})