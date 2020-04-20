import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Vuelidate from "vuelidate";

library.add(fas);
Vue.component('v-icon', FontAwesomeIcon);

Vue.use(Vuelidate);

new Vue({
  el: '#app',
  render: h => h(App)
})