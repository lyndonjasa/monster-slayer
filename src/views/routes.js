import VueRouter from "vue-router";

// routes
import LoginRoutes from "./login/login-route";
import CharacterRoutes from "./character/character-routes";
import DungeonRoutes from "./dungeon/dungeon-routes";

let routes = [{
  path: "/",
  redirect: "/login"
}];

// add routes here
routes.push(...LoginRoutes);
routes.push(...CharacterRoutes);
routes.push(...DungeonRoutes);

export default new VueRouter({
  mode: "hash",
  routes
});