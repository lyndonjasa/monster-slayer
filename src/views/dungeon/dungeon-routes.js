import DungeonHome from "./Home";
import Battlefield from "./Battlefield";

const routes = [
  {
    path: "/dungeons",
    component: DungeonHome
  },
  {
    path: "/dungeons/:id",
    component: Battlefield
  }
];

export default routes;