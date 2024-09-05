// src/router.js

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import Homepage from "./pages/Home/Homepage";
import AdminLayout from "./pages/Admin/Admin";
import WithNavbarLayout from "./layouts/WithNavbarLayout";
import WithoutNavbarLayout from "./layouts/WithoutNavbarLayout";
import LoginPage from "./pages/Login/Loginpage";
import RegisterPage from "./pages/Register/Registerpage";
import ProfilePage from "./pages/Profile/Profilepage";
import ShopPage from "./pages/Shop/ShopPage";
import BookDetailsPage from "./pages/BookDetails/BookDetails";
import CartPage from "./pages/Cart/CartPage";
import WishlistPage from "./pages/Wishlist/WishlistPage";
import ShippingPage from "./pages/Shipping/Shipping";
import OrderPage from "./pages/Order/OrderPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import Books from "./pages/Admin/Books";
import Category from "./pages/Admin/Category";
import Orders from "./pages/Admin/Orders";
import Payments from "./pages/Admin/Payments";
import Testimonial from "./pages/Admin/Testimonial";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes with Navbar */}
      <Route element={<WithNavbarLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:categoryId" element={<ShopPage />} />
        <Route path="/books/:bookId" element={<BookDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Route>

      {/* Admin Routes without Navbar */}
      <Route element={<WithoutNavbarLayout />}>
        <Route element={<AdminLayout />}>
          {" "}
          {/* Use AdminLayout for admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/books" element={<Books />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/payment" element={<Payments />} />
          <Route path="/admin/testimonial" element={<Testimonial />} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
