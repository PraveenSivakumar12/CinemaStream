import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";

import Home from "../Pages/Home";
import Movies from "../Pages/movies";
import TVShows from "../Pages/TVshows";
import MyList from "../Pages/Favourites";
import Login from "../Pages/login";

import Subscription from "../Pages/Subscription";
import PremiumContent from "../Pages/Premium";

import ProtectedRoute from "./ProtectedRoute";
import SubscriptionRoute from "./SubscriptionRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movies",
        element: <Movies />,
      },
      {
        path: "tv-shows",
        element: <TVShows />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },

      // Login required
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "my-list",
            element: <MyList />,
          },
        ],
      },

      // Login + active subscription required
      {
        element: <SubscriptionRoute />,
        children: [
          {
            path: "premium",
            element: <PremiumContent />,
          },
        ],
      },
    ],
  },
]);

export default router;