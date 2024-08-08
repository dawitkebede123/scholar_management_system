import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login_Admin from "./Login_Admin"
import Login_User from "./Login_User"
import App from "./Admin";
import Business from './Business'
import Almanac from "./Almanac";
import Home_Authentication from './home_authentication'

function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login_User />}></Route>
      <Route path="/login_admin" element={<Login_Admin />}></Route>
      <Route path="/login_user" element={<Login_User />}></Route>
      <Route path="/admin" element={<App />}></Route>
      <Route path="/almanac/*" element={<Almanac />}></Route>
      <Route path="/business/*" element={<Business/>}></Route>
    </Routes>
  );
}
export default HomeRoutes;
