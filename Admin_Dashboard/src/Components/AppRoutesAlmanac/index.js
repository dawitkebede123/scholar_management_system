import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "../../Pages/User";
import Dashboard from "../../Pages/Dashbaord";
import Almanac from "../../Pages/Almanac";
import Business from "../../Pages/Business";
import Announcement from "../../Pages/Announcement";
import Manage from "../../Pages/Manage";

// import Login_Admin from "../../Pages/Login_Admin";
import Register from "../../Pages/Register";
import Home_Authentication from "../../home_authentication";

function AppRoutesAlmanac() {
  return (
    <Routes>
      {/* <Route path="/" element={<Dashboard />}></Route> */}
      <Route path="/" element={<Almanac />}></Route>
      {/* <Route path="/business" element={<Almanac />}></Route> */}
      {/* <Route path="/user" element={<User />}></Route> */}
      {/* <Route path="/announcement" element={<Announcement />}></Route> */}
      <Route path="/almanac/manage" element={<Manage />}></Route>
      <Route path="/almanac/register" element={<Register />}></Route>
      <Route path="../"  element={<Home_Authentication />}></Route>
    
    </Routes>
  );
}
export default AppRoutesAlmanac;
