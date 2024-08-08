import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Login_Admin from "./Login_Admin"
import Login_User from "./Login_User"
import Admin from "./Admin";
import Home_Authentication from './home_authentication'
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import HomeRoutes from "./home_route";
import AppRoutes from "./Components/AppRoutes";
import { ContextProviders } from "./context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
  {/* here identify who is accessing the system */}
      {/* <Home_Authentication/> */}
      {/* <Login_User/> */}
      <ContextProviders>
      <Routes>
      <Route path="/*" element={<HomeRoutes />} />
      <Route path="/admin/*" element={<Admin />} />
      
      {/* <HomeRoutes path="/"/>
       <AppRoutes path="/admin/*"/> */}
      </Routes>
      </ContextProviders>
      {/* <App/> */}
      {/* <Login_Admin/> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
