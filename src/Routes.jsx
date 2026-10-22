
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout";

import Home from "./Pages/Home";
import Movies from "./Pages/movies";
import TVShows from "./Pages/TVshows";
import MyList from "./Pages/Favourites";
import Login from "./Pages/login";

import {createBrowserRouter,} from "react-router-dom"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-shows" element={<TVShows />} />
          <Route path="my-list" element={<MyList />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
