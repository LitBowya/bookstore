// src/router.js

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Home/Homepage";
import Admin from "./pages/Admin/Admin";
import WithNavbarLayout from "./layouts/WithNavbarLayout";
import WithoutNavbarLayout from "./layouts/WithoutNavbarLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes with Navbar */}
      <Route element={<WithNavbarLayout />}>
        <Route index element={<Homepage />} />
      </Route>

      {/* Admin Routes without Navbar */}
      <Route element={<WithoutNavbarLayout />}>
        <Route path="/admin" element={<Admin />} />
        {/* Admin Dashboard without Navbar */}
      </Route>
    </Route>
  )
);

export default router;
