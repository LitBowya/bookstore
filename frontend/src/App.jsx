
import { Outlet } from "react-router-dom"; // Outlet is used to render child routes

const App = () => {
  return (
    <div>
      <Outlet /> {/* Renders the nested routes */}
    </div>
  );
};

export default App;
