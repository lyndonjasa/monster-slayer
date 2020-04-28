import VueRouter from "vue-router";

// routes
import LoginRoutes from "./login/login-route";

let routes = [{
  path: "/",
  redirect: "/login"
}];

// add routes here
routes.push(...LoginRoutes);

export default new VueRouter({
  mode: "hash",
  routes
});