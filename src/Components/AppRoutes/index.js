import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "../../Pages/User";
import Dashboard from "../../Pages/Dashbaord";
import Almanac from "../../Pages/Almanac";
import Business from "../../Pages/Business";
import Announcement from "../../Pages/Announcement";
import Manage from "../../Pages/Manage";

import Login from "../../Pages/login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/almanac" element={<Almanac />}></Route>
      <Route path="/business" element={<Business />}></Route>
      <Route path="/user" element={<User />}></Route>
      <Route path="/announcement" element={<Announcement />}></Route>
      <Route path="/manage" element={<Manage />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}
export default AppRoutes;
