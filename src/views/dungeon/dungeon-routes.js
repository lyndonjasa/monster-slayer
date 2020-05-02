import DungeonHome from "./Home";
import Battlefield from "./Battlefield";
import { isAuthorized } from "../../shared/session-guard";

const routes = [
  {
    path: "/dungeons",
    component: DungeonHome,
    beforeEnter: isAuthorized
  },
  {
    path: "/dungeons/:id",
    component: Battlefield,
    beforeEnter: isAuthorized
  }
];

export default routes;