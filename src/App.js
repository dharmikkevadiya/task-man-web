import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import "react-tooltip/dist/react-tooltip.css";
import SidebarRoute from "./pages/SidebarRoute";
import Navbar from "./components/navbar/Navbar";

function App() {
  const PrivateRoute = ({ children }) => {
    let isAuthenticated = false;
    const token = localStorage.getItem("token");

    if (token) isAuthenticated = true;

    if (isAuthenticated) {
      return children;
    }

    return <Navigate to="/" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <SidebarRoute />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
