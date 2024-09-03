
import { Outlet } from "react-router-dom";

const WithNavbarLayout = () => {
  return (
    <div>
      {/* <Navbar />  */}
      <main>
        <Outlet /> {/* Renders nested routes */}
      </main>
    </div>
  );
};

export default WithNavbarLayout;
