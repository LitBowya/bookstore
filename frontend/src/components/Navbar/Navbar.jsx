import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import { FaUserShield } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaUser, FaSearch, FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import NavbarCss from "./Navbar.module.css";
import { setCredentials } from "../../redux/auth.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfilePictureUrl } from "../../utils/profilePicture";
import { useLogoutMutation } from "../../slices/authApiSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.books);
  const profilePictureUrl = getProfilePictureUrl();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setCredentials(null));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
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
        <IconButton color="inherit" component={Link} to="/search">
          <FaSearch />
        </IconButton>

        {userInfo && (
          <>
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
          </>
        )}

        {/* User Profile Icon */}

        {userInfo ? (
          <IconButton component={Link} to="/profile" color="inherit">
            <img
              src={profilePictureUrl}
              alt="profile"
              className={NavbarCss.profilePicture}
            />
          </IconButton>
        ) : (
          <IconButton component={Link} to="/login" color="inherit">
            <FaUser />
          </IconButton>
        )}

        <div className={NavbarCss.admin}>
          {userInfo?.user?.isAdmin && (
            <>
              <IconButton component={Link} to="/admin" color="inherit">
                <FaUserShield />
              </IconButton>
              <IconButton>
                <IoIosLogOut size={30} onClick={handleLogout} />
              </IconButton>
            </>
          )}
          {userInfo && !userInfo.user.isAdmin && (
            <IoIosLogOut size={30} onClick={handleLogout} />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
