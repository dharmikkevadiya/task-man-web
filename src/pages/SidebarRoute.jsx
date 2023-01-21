import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import Products from "./Products";
import Home from "./Home";
import NoPage from "./NoPage";
import Tasks from "./Tasks";
import Users from "./Users";
import Navbar from "../components/navbar/Navbar";

const SidebarRoute = () => {
  return (
    <>
      <Sidebar>
        <Navbar />
        <Routes path="/">
          <Route path="app" index element={<Home />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Sidebar>
    </>
  );
};

export default SidebarRoute;
