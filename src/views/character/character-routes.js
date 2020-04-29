import CharacterHome from "./Home";
import Inventory from "./Inventory";

const routes = [
  {
    path: "/character",
    component: CharacterHome
  },
  {
    path: "/character/inventory",
    component: Inventory
  }
];

export default routes;