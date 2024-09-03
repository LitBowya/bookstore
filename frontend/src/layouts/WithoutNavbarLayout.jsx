
import { Outlet } from "react-router-dom";

const WithoutNavbarLayout = () => {
  return (
    <div>
      <main>
        <Outlet /> {/* Renders nested routes */}
      </main>
    </div>
  );
};

export default WithoutNavbarLayout;
