import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./screens/Homepage";
import CreateEvent from "./screens/CreateEvent/CreateEvent";
import Login from "./screens/Login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route
        path="/create-event"
        element={
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
