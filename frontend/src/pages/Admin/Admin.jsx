import { Outlet } from "react-router-dom";
import { Layout, Menu, Dropdown, Menu as AntMenu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogoutMutation } from "../../slices/authApiSlice";
import { setCredentials } from "../../redux/auth";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminCss from "./Admin.module.css"; // Custom CSS for Admin Layout

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [logout] = useLogoutMutation();
  const location = useLocation(); // To get the current path

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
        dispatch(setCredentials(null));
        navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menu = (
    <AntMenu className={AdminCss.dropDown}>
      <AntMenu.Item>
        <Link to="/">Go Home</Link>
      </AntMenu.Item>
      <AntMenu.Item onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </AntMenu.Item>
      <AntMenu.Item disabled>{userInfo?.user?.name}</AntMenu.Item>
    </AntMenu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          <div className={AdminCss.userInfo}>
            <span className="textw-white fs-6">Bookstore Management</span>
          </div>
          <Menu.Item key="/admin">
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/admin/users">
            <Link to="/admin/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="/admin/books">
            <Link to="/admin/books">Books</Link>
          </Menu.Item>
          <Menu.Item key="/admin/category">
            <Link to="/admin/category">Categories</Link>
          </Menu.Item>
          <Menu.Item key="/admin/orders">
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="/admin/payment">
            <Link to="/admin/payment">Payments</Link>
          </Menu.Item>
          <Menu.Item key="/admin/testimonial">
            <Link to="/admin/testimonial">Testimonials</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={AdminCss.header}>
          <span className="fs-4">Ghana Telecommunication Bookstore</span>
          <Dropdown overlay={menu} trigger={["hover"]}>
            <Image
              src={`${backendUrl}${userInfo?.user?.profilePicture}`}
              className={AdminCss.profilePic}
            />
          </Dropdown>
        </Header>
        <Content style={{ margin: "24px 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
