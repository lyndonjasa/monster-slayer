import CharacterHome from "./Home";
import Inventory from "./Inventory";
import Skills from "./Skills";

const routes = [
  {
    path: "/character",
    component: CharacterHome
  },
  {
    path: "/character/inventory",
    component: Inventory
  },
  {
    path: "/character/skills",
    component: Skills
  }
];

export default routes;