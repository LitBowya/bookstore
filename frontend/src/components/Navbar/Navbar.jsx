import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import NavbarCss from "./Navbar.module.css";
import { getProfilePictureUrl } from "../../utils/profilePicture";

const Navbar = () => {
    const userInfo = useSelector((state) => state.auth.userInfo);
    const cartItems = useSelector((state) => state.cart.items);
    const wishlist = useSelector((state) => state.wishlist.books);
  const profilePictureUrl = getProfilePictureUrl();
  return (
    <AppBar position="static" className={NavbarCss.navbar}>
      <Toolbar className={NavbarCss.toolbar}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" className={NavbarCss.link}>
            <img
              src="/images/gctu-logo.png"
              alt="logo"
              className={NavbarCss.logo}
            />
          </Link>
        </Typography>

        {/* Search Icon */}
        <IconButton color="inherit">
          <FaSearch />
        </IconButton>

        {/* Wishlist Icon */}
        <IconButton color="inherit" component={Link} to="/wishlist">
          <Badge badgeContent={wishlist.length || 0} color="error">
            <FaHeart />
          </Badge>
        </IconButton>

        {/* Cart Icon */}
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={cartItems.length || 0} color="error">
            <FaShoppingCart />
          </Badge>
        </IconButton>

        {/* User Profile Icon */}
        <IconButton component={Link} to="/profile" color="inherit">
          {userInfo ? (
            <img
              src={profilePictureUrl}
              alt="profile"
              className={NavbarCss.profilePicture}
            />
          ) : (
            <FaUser />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
