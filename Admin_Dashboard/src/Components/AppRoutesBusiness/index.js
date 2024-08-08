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

function AppRoutesBusiness() {
  return (
    <Routes>
      <Route path="/" element={<Business />}></Route>
      {/* <Route path="/user" element={<User />}></Route> */}
      {/* <Route path="/announcement" element={<Announcement />}></Route> */}
      <Route path="/business/manage" element={<Manage />}></Route>
      <Route path="/business/register" element={<Register />}></Route>
      <Route path="../"  element={<Home_Authentication />}></Route>
    
    </Routes>
  );
}
export default AppRoutesBusiness;
