import CharacterHome from "./Home";
import Inventory from "./Inventory";
import Skills from "./Skills";
import { isAuthorized } from "../../shared/session-guard";

const routes = [
  {
    path: "/character",
    component: CharacterHome,
    beforeEnter: isAuthorized
  },
  {
    path: "/character/inventory",
    component: Inventory,
    beforeEnter: isAuthorized
  },
  {
    path: "/character/skills",
    component: Skills,
    beforeEnter: isAuthorized
  }
];

export default routes;