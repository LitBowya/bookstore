import { Layout, Menu } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../redux/auth";
import { Image } from "react-bootstrap";
import AdminCss from "./Admin.module.css"; // Custom CSS for Admin Layout

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(setCredentials(null));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline">
          <div className={AdminCss.userInfo}>
            <Image
              src="/path-to-profile-picture" // Replace with real path or dynamic logic
              roundedCircle
              className={AdminCss.profileImage}
            />
            <p className={AdminCss.userName}>{userInfo?.user?.name}</p>
          </div>
          <Menu.Item key="1">
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/admin/books">Books</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/admin/category">Categories</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/admin/payment">Payments</Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to="/admin/testimonial">Testimonials</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={AdminCss.header}>
          <div className={AdminCss.headerContent}>
            <span>Welcome, {userInfo?.user?.name}</span>
            <FaSignOutAlt
              size={24}
              onClick={handleLogout}
              className={AdminCss.logoutIcon}
            />
          </div>
        </Header>
        <Content style={{ margin: "24px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
