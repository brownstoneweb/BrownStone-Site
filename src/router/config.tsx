import type { RouteObject } from "react-router-dom";
import NotFound from "../NotFound";
import Home from "../app/celestia/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
